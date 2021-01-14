package structs

import "time"

type User struct {
	ID          int    `gorm:"primary key"`
	Name        string `db:"name"`
	UserName    string `gorm:"unique"`
	Email       string `db:"email"`
	Password    string `db:"password"`
	Bio         string `db:"bio"`
	Profile_img string `db:"profile_img"`
	Tweet       []Tweet
	Favorite    []Favorite
}

type Tweet struct {
	ID        int       `db:"tweet_id"`
	UserId    int       `db:"user_id"`
	Content   string    `db:"content"`
	CreatedAt time.Time `db:"created_at"`
	Favorite  []Favorite
}

// UserとTweetの中間テーブル
// 「誰が」「どのツイートを」いいねしているかを管理。
type Favorite struct {
	ID      int `gorm:"favorite_id"`
	UserId  int `db:"user_id"`
	TweetID int `db:"tweet_id"`
}

// UserとUserの中間テーブル
// 「どのユーザーが」「どのユーザーを」フォローしているかを管理
type Follower struct {
	ID           int `gorm:"follow_id"`
	Following_id int `db:"following_id"`
	Followed_id  int `db:"followed_id"`
}

type ReturnContent struct {
	LoginUser User
	Tweets    []Tweet
	Users     []User
}

type SessionInfo struct {
	LoginUserID string
}
