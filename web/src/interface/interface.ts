export type User = {
    ID: number
    Name: string
    UserName: string
    Bio: string
    Email: string
    Password:string
    Profile_img: string
    Tweet?: any
    Favorite?: any
}

export type Tweet = {
    ID: number
    UserId: number
    Content: string
    CreatedAt: Date
    Favorite?:any
}