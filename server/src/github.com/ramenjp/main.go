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

const location = "Asia/Tokyo"

// func init() {
// 	loc, err := time.LoadLocation(location)
// 	if err != nil {
// 		loc = time.FixedZone(location, 9*60*60)
// 	}
// 	time.Local = loc
// }

func main() {
	now := time.Now()
	fmt.Println("time", now.Format(time.RFC3339))

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
		loginUser := GetUser(c)
		var ReturnContent structs.ReturnContent
		var users []structs.User
		var tweets []structs.Tweet
		db := gormConnect()
		db.Select("user_name").Find(&users)
		db.Select("content").Order("created_at ASC").Find(&tweets)
		fmt.Println("/top : tweets", tweets)
		ReturnContent.LoginUser = loginUser
		ReturnContent.Users = users
		ReturnContent.Tweets = tweets
		c.JSON(http.StatusOK, ReturnContent)
		db.Close()
	})

	engine.POST("/createTweet", func(c *gin.Context) {
		t := time.Now()
		fmt.Println("/createTweet", t)
		session := sessions.Default(c)
		username := session.Get("loginuser")
		var loginUser structs.User
		db := gormConnect()
		db.Where("user_name = ?", username).Find(&loginUser)
		content := c.PostForm("content")
		tweet := structs.Tweet{Content: content, User_id: loginUser.ID}
		db.Create(&tweet)
		db.Close()
	})

	engine.POST("/createUser", func(c *gin.Context) {
		username := c.PostForm("username")
		email := c.PostForm("email")
		password := c.PostForm("password")
		fmt.Println("name: " + username + "email:" + email + "password" + password)
		newUser := signup.CreateUser(username, email, password)
		db := gormConnect()
		db.Create(&newUser)
		db.Close()
	})

	engine.POST("/login", func(c *gin.Context) {
		fmt.Println("/login API")
		username := c.PostForm("username")
		password := c.PostForm("password")
		db := gormConnect()
		var loginUser structs.User
		db.First(&loginUser, "user_name = ?", username)
		db.Close()
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
	})

	engine.GET("/logout", func(c *gin.Context) {
		session := sessions.Default(c)
		fmt.Println("/logout", session.Get("loginuser"))
		session.Clear()
		session.Save()
		c.String(http.StatusOK, "ログアウト完了")
	})

	engine.POST("/like", func(c *gin.Context) {
		fmt.Println("/like")
	})

	engine.POST("/dislike", func(c *gin.Context) {
		fmt.Println("/dislike")
	})

	engine.POST("/reTweet", func(c *gin.Context) {
		fmt.Println("/reTweet")
	})

	engine.POST("/deleteReTweet", func(c *gin.Context) {
		fmt.Println("/deleteRetweet")
	})

	engine.GET("/profile", func(c *gin.Context) {
		//ツイート取得
		type ReturnContent struct {
			LoginUser       structs.User
			LoginUserTweets []structs.Tweet
		}
		var returnContent ReturnContent
		var tweets []structs.Tweet
		db = gormConnect()
		loginUser := GetUser(c)
		db.Where("user_id = ?", loginUser.ID).Find(&tweets)
		db.Close()
		returnContent.LoginUser = loginUser
		returnContent.LoginUserTweets = tweets
		fmt.Println("return Content", returnContent)
		c.JSON(http.StatusOK, returnContent)
	})

	engine.POST("/updateUser", func(c *gin.Context) {
		username := c.PostForm("username")
		name := c.PostForm("name")
		bio := c.PostForm("bio")

		var user structs.User
		loginUser := GetUser(c)
		db = gormConnect()
		db.Model(&user).Where("ID = ?", loginUser.ID).Updates(map[string]interface{}{"Name": name, "UserName": username, "Bio": bio})
		fmt.Println("update完了")
		db.Close()
	})

	engine.Run(":2001")
}

func gormConnect() *gorm.DB {
	DBMS := "mysql"
	USER := "root"
	// PASS := "root"
	PROTOCOL := "tcp(localhost:3306)"
	DBNAME := "Twitter"
	CHAR_SET := "?charset=utf8"
	TIME_OPTION := "&parseTime=true"
	LOCAL := "&loc=Local"

	CONNECT := USER + ":" + "@" + PROTOCOL + "/" + DBNAME + CHAR_SET + TIME_OPTION + LOCAL
	fmt.Println("CONNECT", CONNECT)
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

//ユーザ情報取得
func GetUser(c *gin.Context) structs.User {
	session := sessions.Default(c)
	username := session.Get("loginuser")
	var loginUser structs.User
	db := gormConnect()
	db.Where("user_name = ?", username).Find(&loginUser)
	var user structs.User
	fmt.Println("getUser.username", username)
	db.Where("user_name = ?", username).Find(&user)
	return user
}
