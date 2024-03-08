import { useEffect, useState, useRef } from 'react'
import '../../styles/FeaturedSection/Featured.css'
import { SingleAlbum } from '../AlbumsComponent/SingleAlbum'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate, Navigate, NavLink } from 'react-router-dom';

export function Featured(props) {
    const projectId = "bnwzu32b5ab8"
    const navigate = useNavigate()
    const [getDisplayData, setDisplayData] = useState([])
    const [getAreaPosition, setAreaPosition] = useState(0)
    const [getIncrementer, setIncrementer] = useState(0)
    const [getRightNavigatorColor, setRightNavigatorColor] = useState(true)
    const [getLeftNavigatorColor, setLeftNavigatorColor] = useState(false)
    const [getFilterValue, setFilterValue] = useState("")

    const refSliderWidth = useRef()
    const refContentWidth = useRef()

    useEffect(() => {
        if (getAreaPosition === 0) {
            setLeftNavigatorColor(false)
        }else{
            setLeftNavigatorColor(true)
        }
        if(getAreaPosition === -refContentWidth.current.offsetWidth + refSliderWidth.current.offsetWidth && getAreaPosition !== 0){
            setRightNavigatorColor(false)
        }else{
            setRightNavigatorColor(true)
        }
    }, [getAreaPosition])

    useEffect(function () {
        setFilterValue(prev => props.filterValue)
        ApiCall()
    }, [])


    async function ApiCall() {
        let request = await fetch(`https://academics.newtonschool.co/api/v1/music/${props.cardType === "song" ? `song?limit=14&filter={"${props.filterKey}":"${props.filterValue}"}&sort={"dateOfRelease":-1}`:`album?limit=14&sort={"release":-1}`}`, {
            'method': 'GET',
            'headers': {
                'projectId': projectId
            }
        })
        let dataBase = await request.json()
        // console.log(dataBase.data)
        setDisplayData((prev) => [...prev, ...dataBase.data])
    }


    function leftNavigator() {
        if (getAreaPosition < -1) {
            if (getIncrementer == 0) {
                setAreaPosition(prev => prev + (0.9 * refSliderWidth.current.offsetWidth))
            } else {
                console.log("iam getting executed")
                setAreaPosition(prev => prev + getIncrementer)
                setIncrementer(prev => 0)
            }
        }
    }

    function rightNavigator() {
        if (getIncrementer == 0) {
            if (refContentWidth.current.offsetWidth + getAreaPosition < 2 * refSliderWidth.current.offsetWidth) {
                setIncrementer(prev => getAreaPosition + refContentWidth.current.offsetWidth - refSliderWidth.current.offsetWidth)
                setAreaPosition(prev => -(refContentWidth.current.offsetWidth - refSliderWidth.current.offsetWidth))
            }
            else {
                setAreaPosition(prev => prev - (0.9 * refSliderWidth.current.offsetWidth))
            }
        }

    }

    // function seeAllButtonHandler(e){
    //     console.log(e)
    // }
    return (<section id={props.filterValue} style={{ 'position': 'relative', top: '0', marginTop: '3px', marginBottom: '3px', paddingLeft: '3%', paddingRight: '2%', width: '100%'}}>
        <h1 id={`${props.filterValue}-heading`} style={{ 'marginBottom': '30px', fontSize: '20px', fontWeight: 'boldest' }}>{props.filterKey === "mood" ? `Feeling 🧡 ${getFilterValue}` : getFilterValue}</h1>

        <div id={`${props.filterValue}-floating-area`} style={{ width: '100%', height: '270px', position: 'relative', top: '0', overflowX: 'hidden' }} ref={refSliderWidth}>
            <div id={`${props.filterValue}-area`} style={{display: 'flex', gap: '30px', position: 'absolute', top: '0', transition: '0.8s left ease', left: `${getAreaPosition}px` }} ref={refContentWidth}>
                {getDisplayData.map(function (value, index) {
                        if (props.cardType === "song"){
                            return (<SingleAlbum value={value} setUrl = {props.setUrl}/>)
                        }else{
                            return (<SingleAlbum value={value}/>)
                        }
                })}
            </div>
        </div>
        <div id={`${props.filterValue}-floating-area-navigators`} style={{ position: 'absolute', top: '0', right: '90px', display: 'flex', width: '180px', padding: '1px 2px', justifyContent: 'space-between', alignItems: 'center', height: '40px' }}>
            <ArrowBackIosNewIcon style={{ 'color': getLeftNavigatorColor ? 'white' : 'rgb(50,50,50)', 'cursor': 'pointer', fontSize: 'small' }} onClick={leftNavigator} />
            <ArrowForwardIosIcon style={{ 'color': getRightNavigatorColor ? 'white' : 'grey', 'cursor': 'pointer', fontSize: 'small' }} onClick={rightNavigator} />
            <NavLink to = {`/${props.cardType}/${props.filterKey}/${props.filterValue.split(" ").join('_')}`}><button id='filterValue-see-all-button' >SEE ALL</button></NavLink>
            {/* onClick={()=>{navigate(`/${props.filterValue}`)}} */}
        </div>

    </section>)
}