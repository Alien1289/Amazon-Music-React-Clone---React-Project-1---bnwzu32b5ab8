import { useEffect, useState } from "react"
import { SingleAlbum } from "../AlbumsComponent/SingleAlbum"
import '../../styles/SeeAllComponent/SeeAll.css'
import { useParams } from "react-router-dom"

export function SeeAll() {
    const projectId = "bnwzu32b5ab8"
    const [getDisplayData, setDisplayData] = useState([])
    const {cardType, filterKey, filterValue} = useParams()

    useEffect(function () {
        ApiCall()
    }, [])

    async function ApiCall() {
        let request = await fetch(`https://academics.newtonschool.co/api/v1/music/${cardType === "song" ? `song?limit=1845&filter={"${filterKey}":"${filterValue.split("_").join(" ")}"}&sort={"dateOfRelease":-1}`:`album?limit=100&sort={"release":-1}`}`, {
            'method': 'GET',
            'headers': {
                'projectId': projectId
            }
        })
        let dataBase = await request.json()
        // console.log(dataBase.data)
        setDisplayData((prev) => [...prev, ...dataBase.data])
    }

    return (<div id="seeAll-container">
        <div id="seeAll-grid">
            {getDisplayData.map(function (value, index) {
                if (cardType === "song") {
                    return (<SingleAlbum thumbnail={value.thumbnail} title={value.title} artists={value.artist} />)
                } else {
                    return (<SingleAlbum thumbnail={value.image} title={value.title} artists={value.artists} />)
                }
            })}
        </div>
    </div>)
}