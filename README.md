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

## エンドポイント
- GET    /top            フォローしているユーザのツイート、自分のユーザ情報返す
- GET    /logout         セッションを削除しログアウトする      
- GET    /profile        自分のユーザ情報とツイートを返す
- POST   /createTweet    フロントから渡された情報をもとにツイートをDBに保存      
- POST   /createUser     フロントから渡された情報をもとにユーザーをDBに保存      
- POST   /login          ユーザーネームとパスワードを元に、DBにハッシュ化されたパスワードと入力されたパスワードをハッシュした結果が同じなら200を返し、セッションを作る
- POST   /like           Favoriteテーブルにログイン中のユーザーIDとツイートIDを含んだカラムを作成
- POST   /dislike        Favoriteテーブルにログイン中のユーザーIDとツイートIDを含んだカラムを削除      
- POST   /reTweet              
- POST   /deleteReTweet        
- POST   /follow         Followersテーブルにログイン中のユーザーIDとフォロー対象のユーザーIDを含んだカラムを作成
- POST   /unfollow       Followersテーブルにログイン中のユーザーIDとフォロー対象のユーザーIDを含んだカラムを削除      
- POST   /judgeIsMyAccout   プロフィール画面が自分の画面か他ユーザの画面がを判定し、bool値を返す   
- POST   /otherProfile   選択したユーザーネームをもとにユーザー情報を返す      
- POST   /updateUser     フロントから渡された情報をもとにユーザー情報を上書きし、DBに保存       

## ER図
<img width="594" alt="スクリーンショット 2021-01-15 8 16 55" src="https://user-images.githubusercontent.com/49260657/104660510-092a7900-570a-11eb-9fc0-dcfcd82521b0.png">


## 実装できた機能
- ログイン
- ログアウト
- セッション管理
- 会員登録
- ツイート機能
- フォロー機能
- いいね機能

## 実装が不十分な箇所,今後改善したい箇所
- ツイートがフォローしているユーザのツイートしか表示できない(自分のツイートが表示できない)
- フォローボタンを押して状態を変えた後画面をリロードするとフォローはされているが未フォロー状態のボタンが表示される
- 他ユーザーのプロフィール画面を見ると情報が表示されない
- 画像の投稿
