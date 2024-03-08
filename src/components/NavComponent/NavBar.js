import '../../styles/NavComponent/NavBar.css'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PodcastsRoundedIcon from '@mui/icons-material/PodcastsRounded';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { UiSearchNavInputComp } from './UiSearchNavInputComp';
import { NavLink } from 'react-router-dom';

import logo from './logo.png'
import logoStacked from './logo_stacked.png'
import { useEffect, useState } from 'react';

export function NavBar(props) {
    const [getLibModal, setLibModal] = useState(false)
    const [getSignInModal, setSignInModal] = useState(false)
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    console.log(viewportWidth)

    useEffect(function () {
        if (props.getClickCount === 0) {
            setSignInModal(prev => false)
        } else {
            setSignInModal(prev => true)
        }
    }, [props.getClickCount])

    function displayLibModalHandler() {
        if (getSignInModal == false) {
            setLibModal(prev => true)
        }
    }
    function undisplayLibModalHandler() {
        setLibModal(prev => false)
    }
    function displaySignInModalHandler() {
        props.setClickCount(prev => 1)
    }

    return (<nav>
        <div id='nav-part1'>
            <NavLink id='nav-navlink-logo' to='/'><img src={viewportWidth > 965 ? logo : logoStacked} id='nav-logo-bigScreen' /></NavLink>
            {viewportWidth > 965 && <ul id='nav-links-tray'>
                <li><NavLink to='/' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><HomeRoundedIcon style={{ 'color': 'inherit', fontSize: '25px' }} /> <div style={{ fontWeight: '550' }}>HOME</div></NavLink></li>
                <li><NavLink to='/podcasts' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><PodcastsRoundedIcon style={{ 'color': 'inherit', fontSize: '25px' }} /> <div style={{ fontWeight: '550' }}>PODCASTS</div></NavLink></li>
                <li id='myLibrary-container' onMouseEnter={displayLibModalHandler} onMouseLeave={undisplayLibModalHandler} onClick={displayLibModalHandler}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HeadphonesRoundedIcon style={{ 'color': 'inherit', fontSize: '25px' }} />
                        <div style={{ fontWeight: '550' }}>LIBRARY</div></div>
                    {getLibModal && <div id='myLibrary-modal'>
                        <ul>
                            <li>Music</li>
                            <li>Podcasts</li>
                        </ul>
                    </div>}
                </li>
            </ul>}
        </div>


        <div id='nav-part2'>
            {viewportWidth <= 965 && <ul id='nav-links-tray'>
                <li><NavLink to='/' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><HomeRoundedIcon style={{ 'color': 'inherit', fontSize: '25px' }} /></NavLink></li>
                <li><NavLink to='/podcasts' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><PodcastsRoundedIcon style={{ 'color': 'inherit', fontSize: '25px' }} /></NavLink></li>
                <li id='myLibrary-container' onMouseEnter={displayLibModalHandler} onMouseLeave={undisplayLibModalHandler} onClick={displayLibModalHandler}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HeadphonesRoundedIcon style={{ 'color': 'inherit', fontSize: '25px' }} />
                    </div>
                    {getLibModal && <div id='myLibrary-modal'>
                        <ul>
                            <li>Music</li>
                            <li>Podcasts</li>
                        </ul>
                    </div>}
                </li>
                <li>{viewportWidth > 808 ? <UiSearchNavInputComp/>: <SearchIcon/>}</li>
                <li><AccountCircleIcon style={{ 'color': 'white', fontSize: '40px', 'marginRight': '8px' }} onClick={displaySignInModalHandler} />
                    {getSignInModal && <div id='signIn-Modal'>
                        <NavLink to="/login"><button id='signIn-Modal-button'>Sign in</button></NavLink>
                    </div>}</li>
            </ul>}
            {viewportWidth > 965 && <UiSearchNavInputComp />}
            {viewportWidth > 965 && <AccountCircleIcon style={{ 'color': 'white', fontSize: '40px', 'marginRight': '8px' }} onClick={displaySignInModalHandler} />}
            {getSignInModal && <div id='signIn-Modal'>
                <NavLink to="/login"><button id='signIn-Modal-button'>Sign in</button></NavLink>
            </div>}
        </div>


    </nav>)
}