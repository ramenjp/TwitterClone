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
	ID    int    `gorm:"id"`
	Name  string `db:"name"`
	Email string `db:"email"`
}

func main() {
	db := gormConnect()
	defer db.Close()

	engine := gin.Default()

	//CORS設定
	engine.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:2000",
		},
		AllowMethods: []string{
			"POST",
			"GET",
			"DELETE",
			"PUT",
			"OPTIONS",
		},
		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
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

	engine.GET("/test", func(c *gin.Context) {

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
	db.AutoMigrate(&User{})

	fmt.Println("SQL connecting...", USER+":"+PASS+"@"+PROTOCOL+"/"+DBNAME)

	if err != nil {
		panic(err.Error())
	}
	return db
}
