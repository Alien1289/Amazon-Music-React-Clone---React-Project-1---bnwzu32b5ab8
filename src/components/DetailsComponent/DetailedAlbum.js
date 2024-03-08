import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../../styles/DetailsComponent/DetailedAlbum.css'
import { PROJECT_ID } from '../Constants'
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


export function DetailedAlbum(props) {
    const [getDisplayData, setDisplayData] = useState([])
    const [getduration, setduration] = useState([])
    const [getplayModal, setPlayModal] = useState(false)
    const { id } = useParams()

    useEffect(() => { ApiCall() }, [])

    async function ApiCall() {
        let request = await fetch(`https://academics.newtonschool.co/api/v1/music/album?filter={"_id":"${id}"}`, {
            'method': 'GET',
            'headers': {
                'projectId': PROJECT_ID
            }
        })
        let dataBase = await request.json()
        setDisplayData((prev) => [...prev, ...dataBase.data])
    }

    function playHandler(value) {
        props.setUrl(value._id)
    }
    const durationHandler = (index, duration) => {
        let list = [...getduration]
        list[index] = Math.floor(duration)
        setduration(list)
        console.log(list)
    }
    function displayPlayModal() {
        // setPlayModal(true)
    }
    function undisplayPlayModal() {
        // setPlayModal(false)
    }
    return (<div id='details'>
        <div id='details-background-blurr'>
            <img src={getDisplayData.length > 0 ? getDisplayData[0].image : ""} />
        </div>
        <div id='details-info-flex1'>
            <div id='details-img-container'>
                <img src={getDisplayData.length > 0 ? getDisplayData[0].image : ""} />
            </div>
            <div id='details-info-flex2'>
                <div style={{ color: 'rgb(37, 209, 218)', fontFamily: 'Impact', fontSize: '12px', fontWeight: '400px', lineHeight: '16px' }}>ALBUM</div>
                <div style={{ fontSize: '60px', fontFamily: 'Impact', fontWeight: '400px', lineHeight: '80px' }}>{getDisplayData.length > 0 ? getDisplayData[0].title : ""}</div>
                <div style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(255, 255, 255, 0.6)' }}>{getDisplayData.length > 0 ? getDisplayData[0].description : ""}</div>
                <div style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(255, 255, 255, 0.6)' }}>{getDisplayData.length > 0 && getDisplayData[0].songs.length} SONGS • 2 HOURS AND 48 MINUTES</div>
            </div>
        </div>



        <table id='details-table'>
            <tbody>
                {getDisplayData.length > 0 && getDisplayData[0].songs.map(function (value, index) {
                    return (<tr>
                        <td>{index + 1}</td>
                        <td>
                            <div className='tbody-image-holder' onMouseEnter={displayPlayModal} onMouseLeave={undisplayPlayModal}>
                                <img src={value.thumbnail} onClick={() => {playHandler(value) }} />
                                {/* {getplayModal && <div id='details-img-container-overlay'><PlayArrowIcon /></div>} */}
                            </div>

                        </td>
                        <td>{value.title}<br/></td>
                        <td>{value.title}</td>
                        <td>00:{getduration[index] ? getduration[index] : "00"}</td>
                        <td><audio src={value.audio_url} controls onLoadedMetadata={(e) => setTimeout(durationHandler(index, e.target.duration), 500)} style={{ display: 'none' }}></audio></td>
                        <td><AddIcon /></td>
                        <td><MoreHorizIcon /></td>
                    </tr>)
                })}
            </tbody>

        </table>
    </div>)
}