# README
## 環境構築
- cd server
- go env -w User/TwitterClone/server

- cd web
- yarn install

## 技術スタック
**フロントエンド**
- React 17.0.1
- Hooks
- Typescript 4.0.3
- styled-Components

**バックエンド**
- go1.14.2 darwin/amd64
- Gin
- GORM
- REST API

**DB**
- MySQL

## アーキテクチャ
### フロント
**page層**
- 主に処理や計算の責務

**template層**
- pageから渡されたpropsを表示する責務
- CSSはここで記述する

### バックエンド
- GET    /top                  
- GET    /logout               
- GET    /profile              
- POST   /createTweet          
- POST   /createUser           
- POST   /login                
- POST   /like                 
- POST   /dislike              
- POST   /reTweet              
- POST   /deleteReTweet        
- POST   /follow               
- POST   /unfollow             
- POST   /judgeIsMyAccout      
- POST   /otherProfile         
- POST   /updateUser           

## ER図
<img width="24" alt="スクリーンショット" src="https://user-images.githubusercontent.com/49260657/104606100-b083bd80-56c2-11eb-8134-a3b5b0366009.png">

## 実装できた機能
- ログイン
- ログアウト
- セッション管理
- 会員登録
- ツイート機能
- フォロー機能
- 

## 実装が不十分な箇所,今後改善したい箇所
- ツイートがフォローしているユーザのツイートしか表示できない(自分のツイートが表示できない)
- フォローボタンを押して状態を変えた後画面をリロードするとフォローはされているが未フォロー状態のボタンが表示される
- 他ユーザーのプロフィール画面を見ると情報が表示されない
