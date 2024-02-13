import { useState, useEffect } from 'react'
import '../../styles/AlbumsComponent/SingleAlbum.css'
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export function SingleAlbum(props) {
    const [getArtistArray, setArtistArray] = useState([])
    const [getOverlay, setOverlay] = useState(false)

    useEffect(() => {
        setArtistArray(props.artists.map(function (value, index) {
            return value.name
        }))

    }, [])
    function overlayHandlerOn(){
        setOverlay(true)
    }
    function overlayHandlerOff(){
        setOverlay(false)
    }

    return (<div id='SingleAlbum'>
        <div id='Single-Album-img-container' onMouseEnter={overlayHandlerOn} onMouseLeave = {overlayHandlerOff}>
            <img src={props.thumbnail} id='Single-Album-img' />
            {getOverlay && <div id='Single-Album-img-container-overlay' style={{ width: '100%', 'height': '100%', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <div style={{display:'flex', position: 'absolute',top:'50%', left:'50%', transform:'translate(-50%,-50%)', gap:'10px'}}>
                    <AddIcon style={{fontSize:'large'}}/>
                    <PlayArrowIcon style={{'fontSize':'large'}}/>
                    <MoreHorizIcon style={{'fontSize':'large'}}/>
                </div>
            </div>}
        </div>

        <div id='Single-Album-info-container'>
            <span id='Single-Album-title-txt'>{props.title}</span>
            <div id='Single-Album-arrtist-txt'>{getArtistArray.join(', ')}</div>
        </div>

    </div>)
}