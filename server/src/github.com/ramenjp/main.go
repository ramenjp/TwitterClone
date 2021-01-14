package main

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/ramenjp/auth"
	"github.com/ramenjp/migrate"
	"github.com/ramenjp/signup"
	"github.com/ramenjp/structs"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

const location = "Asia/Tokyo"

func init() {
	loc, err := time.LoadLocation(location)
	if err != nil {
		loc = time.FixedZone(location, 9*60*60)
	}
	time.Local = loc
}

func main() {
	db := migrate.GormConnect()
	defer db.Close()

	engine := gin.Default()
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
		v := session.Get("loginuser")
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
		//自分以外のユーザ取得
		db.Not("user_name = ?", loginUser.UserName).Select("user_name,id").Find(&users)

		// 	SELECT * FROM Twitter.tweets
		// 	JOIN followers on followed_id = tweets.user_id
		// 	WHERE followed_id in (
		// 	SELECT followed_id FROM Twitter.followers
		// 	JOIN users on users.id  = following_id
		// 　)
		db.Order("created_at DESC").
			Select("tweets.id,tweets.user_id,tweets.content,tweets.created_at").
			Joins("join followers on followed_id = tweets.user_id").
			Where("followed_id", db.Table("followers").Select("followed_id").Joins("join users on users.id  = following_id").QueryExpr()).
			Find(&tweets)

		fmt.Println("フォローしてる人のみのtweets", tweets)
		ReturnContent.LoginUser = loginUser
		ReturnContent.Users = users
		ReturnContent.Tweets = tweets
		c.JSON(http.StatusOK, ReturnContent)
	})

	engine.POST("/createTweet", func(c *gin.Context) {
		session := sessions.Default(c)
		username := session.Get("loginuser")
		var loginUser structs.User
		db.Where("user_name = ?", username).Find(&loginUser)
		content := c.PostForm("content")
		tweet := structs.Tweet{Content: content, UserId: loginUser.ID}
		db.Create(&tweet)
	})

	engine.POST("/createUser", func(c *gin.Context) {
		username := c.PostForm("username")
		email := c.PostForm("email")
		password := c.PostForm("password")
		newUser := signup.CreateUser(username, email, password)
		db.Create(&newUser)
	})

	engine.POST("/login", func(c *gin.Context) {
		username := c.PostForm("username")
		password := c.PostForm("password")
		var loginUser structs.User
		db.First(&loginUser, "user_name = ?", username)
		auth.Login(loginUser.Password, password, loginUser.UserName, c)
	})

	engine.GET("/logout", func(c *gin.Context) {
		auth.Logout(c)
	})

	engine.POST("/like", func(c *gin.Context) {
		tweetId := c.PostForm("tweetId")
		id, _ := strconv.Atoi(tweetId)
		user := GetUser(c)

		favorite := structs.Favorite{UserId: user.ID, TweetID: id}
		db.Create(&favorite)
	})

	engine.POST("/dislike", func(c *gin.Context) {
		tweetId := c.PostForm("tweetId")
		user := GetUser(c)
		var favorite structs.Favorite
		db.Where("tweet_id = ?", tweetId).Where("user_id = ?", user.ID).Delete(&favorite)
	})

	engine.POST("/reTweet", func(c *gin.Context) {
		fmt.Println("/reTweet")
	})

	engine.POST("/deleteReTweet", func(c *gin.Context) {
		fmt.Println("/deleteRetweet")
	})

	engine.POST("/follow", func(c *gin.Context) {
		userid := c.PostForm("userId")
		id, _ := strconv.Atoi(userid)
		loginUserId := GetUser(c).ID

		follower := structs.Follower{Following_id: loginUserId, Followed_id: id}
		db.Create(&follower)
	})

	engine.POST("/unfollow", func(c *gin.Context) {
		userid := c.PostForm("userId")
		// id, _ := strconv.Atoi(userid)
		loginUserId := GetUser(c).ID

		var follower structs.Follower
		db.Where("followed_id = ?", userid).Where("following_id=?", loginUserId).Delete(&follower)
	})

	engine.POST("/judgeIsMyAccout", func(c *gin.Context) {
		loginUserId := GetUser(c).UserName
		var userId = c.PostForm("userId")
		if loginUserId == userId {
			fmt.Println("myAccount")
			c.String(http.StatusOK, "MyAccount")
		} else {
			fmt.Println("OtherAccount")
			c.String(http.StatusOK, "OtherAccout")
		}
	})

	engine.GET("/profile", func(c *gin.Context) {
		//ツイート取得
		type ReturnContent struct {
			LoginUser       structs.User
			LoginUserTweets []structs.Tweet
		}
		var returnContent ReturnContent
		var tweets []structs.Tweet
		loginUser := GetUser(c)
		db.Where("user_id = ?", loginUser.ID).Find(&tweets)

		returnContent.LoginUser = loginUser
		returnContent.LoginUserTweets = tweets
		c.JSON(http.StatusOK, returnContent)
	})

	engine.POST("/otherProfile", func(c *gin.Context) {
		type TweetList struct {
			Content string
		}
		type ReturnContent struct {
			Tweets []TweetList
			User   structs.User
		}
		var List []TweetList
		var returnContent ReturnContent
		var user structs.User
		username := c.PostForm("username")

		//テーブル結合してusernameに一致するツイート取得
		db.Table("tweets").
			Joins("inner join users on tweets.user_id = users.id").
			Where("users.user_name = ?", username).
			Find(&List)

		//ユーザ情報取得
		db.Where("user_name =?", username).Find(&user)
		returnContent.Tweets = List
		returnContent.User = user
		fmt.Println("otherContent user", returnContent)
		c.JSON(http.StatusOK, returnContent)
	})

	engine.POST("/updateUser", func(c *gin.Context) {
		username := c.PostForm("username")
		name := c.PostForm("name")
		bio := c.PostForm("bio")

		var user structs.User
		loginUser := GetUser(c)
		db.Model(&user).Where("ID = ?", loginUser.ID).Updates(map[string]interface{}{"Name": name, "UserName": username, "Bio": bio})
	})

	engine.Run(":2001")
}

//ログインしているユーザの情報取得
func GetUser(c *gin.Context) structs.User {
	session := sessions.Default(c)
	username := session.Get("loginuser")
	var loginUser structs.User
	db := migrate.GormConnect()
	db.Where("user_name = ?", username).Find(&loginUser)
	var user structs.User
	fmt.Println("getUser.username", username)
	db.Where("user_name = ?", username).Find(&user)
	return user
}
