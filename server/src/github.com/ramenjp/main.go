package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/ramenjp/signup"
	"github.com/ramenjp/structs"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func main() {
	db := gormConnect()
	defer db.Close()

	engine := gin.Default()
	// option := sessions.Options{MaxAge: 3600}
	// sessions.Options(option)
	store := cookie.NewStore([]byte("secret"))
	engine.Use(sessions.Sessions("mysession", store))

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
			// "Access-Control-Allow-Credentials",
			// "Access-Control-Allow-Headers",
			// "Content-Type",
			"Access-Control-Allow-Origin",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		AllowCredentials: true,
		MaxAge:           24 * time.Hour,
	}))

	//ルーティング
	engine.GET("/", func(c *gin.Context) {
		session := sessions.Default(c)
		var isLogin bool
		v := session.Get("loginUserId")
		if v == nil {
			isLogin = false
		} else {
			isLogin = true
		}
		c.JSON(200, isLogin)
	})

	engine.GET("/top", func(c *gin.Context) {
		session := sessions.Default(c)
		username := session.Get("loginuser")
		fmt.Println("/top.username", username)
		var loginUser structs.User
		db.Where("user_name = ?", username).Find(&loginUser)
		fmt.Println("/top : loginUser", loginUser)
		// if loginUser ==  {
		// 	c.JSON(500, gin.H{"msg": "session Error"})
		// }
		//ユーザー情報取得
		var ReturnContent structs.ReturnContent
		var users []structs.User
		var tweets []structs.Tweet
		// db.Where("user_name = ?", userSession).Find(&loginUser)
		db.Select("user_name").Find(&users)
		db.Select("content").Find(&tweets)
		ReturnContent.LoginUser = loginUser
		ReturnContent.Users = users
		ReturnContent.Tweets = tweets
		c.JSON(http.StatusOK, ReturnContent)
	})

	engine.POST("/createTweet", func(c *gin.Context) {
		content := c.PostForm("content")
		tweet := structs.Tweet{Content: content}
		db.Create(&tweet)
	})

	engine.POST("/createUser", func(c *gin.Context) {
		username := c.PostForm("username")
		email := c.PostForm("email")
		password := c.PostForm("password")
		fmt.Println("name: " + username + "email:" + email + "password" + password)
		newUser := signup.CreateUser(username, email, password)

		db.Create(&newUser)
	})

	engine.POST("/login", func(c *gin.Context) {
		fmt.Println("")
		fmt.Println("/login API")
		username := c.PostForm("username")
		password := c.PostForm("password")
		db := gormConnect()
		var loginUser structs.User
		db.First(&loginUser, "user_name = ?", username)
		err := bcrypt.CompareHashAndPassword([]byte(loginUser.Password), []byte(password))
		if err != nil {
			fmt.Println("Failure")
			c.JSON(500, gin.H{"msg": err.Error()})
		} else {
			// CreateSession(c, username)
			session := sessions.Default(c)
			session.Set("loginuser", username)
			session.Save()

			fmt.Println("Success")
			c.JSON(200, gin.H{"response": "ログイン完了"})
		}
		db.Close()
	})

	engine.POST("/logout", func(c *gin.Context) {
		session := sessions.Default(c)
		session.Clear()
		session.Save()
		c.String(http.StatusOK, "ログアウト完了")
	})

	engine.Run(":2001")
}

func gormConnect() *gorm.DB {
	DBMS := "mysql"
	USER := "root"
	// PASS := "root"
	PROTOCOL := "tcp(localhost:3306)"
	DBNAME := "Twitter"

	CONNECT := USER + ":" + "@" + PROTOCOL + "/" + DBNAME
	db, err := gorm.Open(DBMS, CONNECT)
	db.AutoMigrate(&structs.User{}, &structs.Tweet{}, &structs.Favorite{}, &structs.Follower{})

	if err != nil {
		panic(err.Error())
	}
	return db
}

func CreateSession(c *gin.Context, username string) {
	session := sessions.Default(c)
	session.Set("loginUserId", username)
	session.Save()

	user := session.Get("loginUserId")
	fmt.Println("CreateSession.username", user)
}

func GetUser(username string) structs.User {
	db := gormConnect()

	var user structs.User
	// session := sessions.Default(c)
	// username := session.Get("loginUserId")

	fmt.Println("getUser.username", username)
	db.Where("user_name = ?", username).Find(&user)
	return user
}
