import * as React from 'react'
import axios from  'axios'
import '../plugins/setting.js'

export const Component = () =>{
    const [tweets,setTweets] = React.useState([])
    React.useEffect (() =>{
        const fetchData = async () => {
            const res = await axios.get(
                "http://localhost:2001/"
            )
        }
        fetchData()
    })

    const fetchData = async () => {
        try{
            const res = await axios.get(
                "http://localhost:2001/"
            )
            console.log("res",res)
        }
        catch(errror){
            console.log("error!")
        }
    } 

    return (
        <button onClick={()=>fetchData()}>fetch</button>
 )
}