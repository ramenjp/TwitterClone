package auth

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Login(loginUserPassword string, password string, username string, c *gin.Context) {
	err := bcrypt.CompareHashAndPassword([]byte(loginUserPassword), []byte(password))
	if err != nil {
		c.JSON(500, gin.H{"msg": err.Error()})
	} else {
		CreateSession(c, username)
		c.JSON(200, gin.H{"response": "ログイン完了"})
	}
}

func Logout(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Save()
	c.String(http.StatusOK, "ログアウト完了")
}

func CreateSession(c *gin.Context, username string) {
	session := sessions.Default(c)
	session.Set("loginuser", username)
	session.Save()
}
