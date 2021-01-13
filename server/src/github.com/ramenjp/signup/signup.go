package signup

import (
	"github.com/ramenjp/crypto"

	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/ramenjp/structs"
)

func CreateUser(username string, email string, password string) *structs.User {
	hashedPassword, _ := crypto.PasswordEncrypt(password)
	newUser := &structs.User{Name: "", UserName: username, Email: email, Password: hashedPassword, Bio: "", Profile_img: ""}
	return newUser
}
