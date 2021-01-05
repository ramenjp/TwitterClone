package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type User struct {
	ID          int    `gorm:"user_id"`
	Name        string `db:"name"`
	Email       string `db:"email"`
	Password    string `db:"password"`
	Bio         string `db:"bio"`
	Profile_img string `db:"profile_img"`
}

type Tweet struct {
	ID      int    `gorm:"tweet_id"`
	User_id int    `db:"user_id"`
	Content string `db:"content"`
}

type Favorite struct {
	ID      int `gorm:"favorite_id"`
	User_id int `db:"user_id"`
	TweetID int `db:"tweet_id"`
}

type Follower struct {
	ID           int    `gorm:"follow_id"`
	following_id string `db:"following_id"`
	followed_id  string `db:"followed_id"`
}

func main() {
	db := gormConnect()
	defer db.Close()

	engine := gin.Default()

	//CORS設定

	// config := cors.DefaultConfig()
	// config.AllowOrigins = []string{"http://localhost:2000"}
	// engine.Use(cors.New(config))
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
		tweet := Tweet{Content: content}
		db.Create(&tweet)
	})

	engine.POST("/")

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
	db.AutoMigrate(&User{}, &Tweet{}, &Favorite{}, &Follower{})
	// db.AutoMigrate(&User{}, &Product{}, &Order{})

	fmt.Println("SQL connecting...", USER+":"+PASS+"@"+PROTOCOL+"/"+DBNAME)

	if err != nil {
		panic(err.Error())
	}
	return db
}
