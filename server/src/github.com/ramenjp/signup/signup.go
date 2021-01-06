package signup

import (
	"fmt"

	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/ramenjp/structs"
	"golang.org/x/crypto/bcrypt"
)

func Intro() {
	fmt.Println("SIGN UP!!!")
}

func CreateUser(username string, email string, password string) *structs.User {
	fmt.Println("CreateUser")
	hashedPassword, _ := PasswordEncrypt(password)
	newUser := &structs.User{Name: "", UserName: username, Email: email, Password: hashedPassword, Bio: "", Profile_img: ""}

	return newUser
}

// パスワードのハッシュ化
func PasswordEncrypt(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}

//hash password と非hash password比較
func CompareHashAndPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
