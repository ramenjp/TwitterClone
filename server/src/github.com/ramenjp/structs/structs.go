package structs

import "time"

type User struct {
	ID          int    `gorm:"user_id"`
	Name        string `db:"name"`
	UserName    string `gorm:"unique"`
	Email       string `db:"email"`
	Password    string `db:"password"`
	Bio         string `db:"bio"`
	Profile_img string `db:"profile_img"`
}

type Tweet struct {
	ID        int       `gorm:"tweet_id"`
	User_id   int       `db:"user_id"`
	Content   string    `db:"content"`
	CreatedAt time.Time `gorm:"type:datetime(6)"`
}

type Favorite struct {
	ID      int `gorm:"favorite_id"`
	User_id int `db:"user_id"`
	TweetID int `db:"tweet_id"`
}

type Follower struct {
	ID           int    `gorm:"follow_id"`
	Following_id string `db:"following_id"`
	Followed_id  string `db:"followed_id"`
}

type ReturnContent struct {
	LoginUser User
	Tweets    []Tweet
	Users     []User
}

type SessionInfo struct {
	LoginUserID string
}
