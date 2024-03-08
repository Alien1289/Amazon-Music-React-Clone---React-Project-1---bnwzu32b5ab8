import '../../styles/MusicPlayerComponent/MusicPlayer.css'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect, useRef, useState } from 'react';
import { PROJECT_ID } from '../Constants';

export function MusicPlayer(props) {
    const elementIdentifier = useRef()
    const [getDisplayData, setDisplayData] = useState([])
    const [getplayAndPauseToggler, setplayAndPauseToggler] = useState(true)

    useEffect(function () {
        // console.log(getDisplayData)
        if (getDisplayData.length > 0) {
            setplayAndPauseToggler(true)
            elementIdentifier.current.play()
        }
    }, [getDisplayData])

    useEffect(() => {
        console.log(props.getUrl)
        if (props.getUrl) {
            ApiCall()
        }
    }, [props.getUrl])

    async function ApiCall() {
        let request = await fetch(`https://academics.newtonschool.co/api/v1/music/song?filter={"_id":"${props.getUrl}"}`, {
            'method': 'GET',
            'headers': {
                'projectId': PROJECT_ID
            }
        })
        let dataBase = await request.json()
        setDisplayData((prev) => [...prev, ...dataBase.data])
    }
    function playClickHandler() {
        setplayAndPauseToggler(true)
        elementIdentifier.current.play()
    }

    function pauseClickHandler() {
        setplayAndPauseToggler(false)
        elementIdentifier.current.pause()
    }

    return (<>{getDisplayData.length > 0 && <div id='music-player'>

            <SkipPreviousIcon style={{cursor:'pointer'}}/>
            {getplayAndPauseToggler ? <PauseIcon onClick={pauseClickHandler} style={{cursor:'pointer'}}/> : <PlayArrowIcon onClick={playClickHandler} style={{cursor:'pointer'}}/>}
            <SkipNextIcon style={{cursor:'pointer'}}/>
            <ShuffleIcon style={{cursor:'pointer'}}/>
            <audio src={getDisplayData[getDisplayData.length - 1].audio_url} controls ref={elementIdentifier} style={{display:'none'}}></audio>

    </div>}</>)
}