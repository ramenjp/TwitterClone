package migrate

import (
	"github.com/jinzhu/gorm"
	"github.com/ramenjp/structs"
)

func GormConnect() *gorm.DB {
	DBMS := "mysql"
	USER := "root"
	// PASS := "root"
	PROTOCOL := "tcp(localhost:3306)"
	DBNAME := "Twitter"
	CHAR_SET := "?charset=utf8"
	TIME_OPTION := "&parseTime=true"
	LOCAL := "&loc=Local"

	CONNECT := USER + ":" + "@" + PROTOCOL + "/" + DBNAME + CHAR_SET + TIME_OPTION + LOCAL
	db, err := gorm.Open(DBMS, CONNECT)
	db.AutoMigrate(&structs.User{})
	db.AutoMigrate(&structs.Tweet{}).AddForeignKey("user_id", "users(id)", "RESTRICT", "RESTRICT")
	db.AutoMigrate(&structs.Favorite{}).AddForeignKey("user_id", "users(id)", "RESTRICT", "RESTRICT").AddForeignKey("tweet_id", "tweets(id)", "RESTRICT", "RESTRICT")
	db.AutoMigrate(&structs.Follower{}).AddForeignKey("following_id", "users(id)", "RESTRICT", "RESTRICT").AddForeignKey("followed_id", "users(id)", "RESTRICT", "RESTRICT")

	if err != nil {
		panic(err.Error())
	}
	return db
}
