import { useEffect, useState } from "react"
import { PROJECT_ID } from "./Constants"

export function Search(){
    const [getSearchTerm, setSearchTerm] = useState("")
    useEffect(function (){
            Api()
    }, [])
    async function Api(){
        let response = await fetch(`https://academics.newtonschool.co/api/v1/music/song?search={"title":"naam"}`, {
            method:'GET',
            headers:{
                'projectID': PROJECT_ID
            },
        }) 
        let result = await response.json()
        console.log(result)
    }
    // (function (){
    //     setSearchTerm("naam")
    // })()
    return (<div>
        {/* <input/> */}
    </div>)
}