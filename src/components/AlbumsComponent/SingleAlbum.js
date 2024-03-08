import { useState, useEffect, useRef } from 'react'
import '../../styles/AlbumsComponent/SingleAlbum.css'
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NavLink, useNavigate } from 'react-router-dom';

export function SingleAlbum(props) {
    const [getArtistArray, setArtistArray] = useState([])
    const [getOverlay, setOverlay] = useState(false)
    const navigate = useNavigate()
    const refElement = useRef()

    useEffect(() => {
        setArtistArray(props.value.type === "song" ? props.value.artist.map(function (val, index) {
            return val.name
        }) : props.value.artists.map(function (val, index) {
            return val.name
        }))

    }, [])
    function overlayHandlerOn(){
        setOverlay(true)
    }
    function overlayHandlerOff(){
        setOverlay(false)
    }

    function songPlayHandler(){
        props.setUrl(props.value._id)
    }

    function navigateToDetailPage(e){
        // console.log(e.target)
        navigate(`/detailsPage/${props.value._id}`)
    }

    return (<div id='SingleAlbum'>
        <div id='Single-Album-img-container' onMouseEnter={overlayHandlerOn} onMouseLeave = {overlayHandlerOff}>
            <img src={props.value.type === "song" ? props.value.thumbnail:props.value.image} id='Single-Album-img' />
            {getOverlay && <div id='Single-Album-img-container-overlay' style={{ width: '100%', 'height': '100%', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <div style={{display:'flex', position: 'absolute',top:'50%', left:'50%', transform:'translate(-50%,-50%)', gap:'10px', alignItems:'center'}}>
                    {props.value.type === "song"? <><AddIcon className='icon-hover-color icons-album' style={{fontSize: '40px'}}/><PlayArrowIcon className='icon-play-hover-enlarge icons-album' style={{fontSize: '60px'}} onClick = {songPlayHandler}/><MoreHorizIcon className='icon-hover-color icons-album' style={{fontSize: '40px'}}/></> : <ArrowForwardIosIcon onClick={navigateToDetailPage}/>}                   
                </div>
            </div>}
        </div>

        <div id='Single-Album-info-container'>
            <span id='Single-Album-title-txt'>{props.value.title}</span>
            <div id='Single-Album-arrtist-txt'>{getArtistArray.join(', ')}</div>
        </div>

    </div>)
}