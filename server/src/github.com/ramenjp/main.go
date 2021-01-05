package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/ramenjp/signup"
	"github.com/ramenjp/structs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func main() {
	signup.Intro()
	db := gormConnect()
	defer db.Close()

	engine := gin.Default()

	//CORS設定
	engine.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:2000",
			"http://localhost:2000/",
		},
		AllowMethods: []string{
			"OPTIONS",
			"GET",
			"POST",
			"DELETE",
			"PUT",
		},
		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
			"*",
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		AllowCredentials: true,
		MaxAge:           24 * time.Hour,
	}))

	//ルーティング
	engine.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello world",
		})
	})

	engine.POST("/createTweet", func(c *gin.Context) {
		content := c.PostForm("content")
		tweet := structs.Tweet{Content: content}
		db.Create(&tweet)
	})

	engine.POST("/createUser", func(c *gin.Context) {
		name := c.PostForm("name")
		email := c.PostForm("email")
		password := c.PostForm("password")
		fmt.Println("namw: " + name + "email:" + email + "password" + password)
		newUser := signup.CreateUser(name, email, password)

		db.Create(&newUser)
	})

	engine.Run(":2001")
}

func gormConnect() *gorm.DB {
	DBMS := "mysql"
	USER := "root"
	PASS := "root"
	PROTOCOL := "tcp(localhost:3306)"
	DBNAME := "Twitter"

	CONNECT := USER + ":" + "@" + PROTOCOL + "/" + DBNAME
	db, err := gorm.Open(DBMS, CONNECT)
	db.AutoMigrate(&structs.User{}, &structs.Tweet{}, &structs.Favorite{}, &structs.Follower{})

	fmt.Println("SQL connecting...", USER+":"+PASS+"@"+PROTOCOL+"/"+DBNAME)

	if err != nil {
		panic(err.Error())
	}
	return db
}
