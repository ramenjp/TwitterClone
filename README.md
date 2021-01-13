# README

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
- GET    /top                  a 
- GET    /logout               a
- GET    /profile              a
- POST   /createTweet          a
- POST   /createUser           a
- POST   /login                a
- POST   /like                 a
- POST   /dislike              a
- POST   /reTweet              a
- POST   /deleteReTweet        a
- POST   /follow               a
- POST   /unfollow             a
- POST   /judgeIsMyAccout      a
- POST   /otherProfile         a
- POST   /updateUser           a

## ER図

## 実装が不十分な箇所,今後改善したい箇所