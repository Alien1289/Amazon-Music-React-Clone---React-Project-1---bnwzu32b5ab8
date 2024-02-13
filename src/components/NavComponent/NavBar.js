import '../../styles/NavComponent/NavBar.css'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PodcastsRoundedIcon from '@mui/icons-material/PodcastsRounded';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UiSearchNavInputComp } from './UiSearchNavInputComp';
import { NavLink } from 'react-router-dom';

import logo from './logo.png'

export function NavBar() {

    return (<nav>
        <div id='nav-part1'>
            <NavLink id='nav-navlink-logo' to='/'><img src={logo} id='nav-logo-bigScreen'/></NavLink>
            <ul id='nav-links-tray'>
                <li><NavLink to='/' style={{display:'flex', alignItems:'center',gap: '8px'}}><HomeRoundedIcon style={{'color': 'inherit', fontSize: '25px'}} /> <div style={{fontWeight:'550'}}>HOME</div></NavLink></li>
                <li><NavLink to='/podcasts' style={{display:'flex', alignItems:'center',gap: '8px'}}><PodcastsRoundedIcon style={{ 'color': 'inherit', fontSize: '25px' }} /> <div style={{fontWeight:'550'}}>PODCASTS</div></NavLink></li>
                <li><NavLink to='/myLibrary' style={{display:'flex', alignItems:'center',gap: '8px'}}><HeadphonesRoundedIcon style={{ 'color': 'inherit', fontSize: '25px' }} /> <div style={{fontWeight:'550'}}>LIBRARY</div></NavLink></li>
            </ul>
        </div>


        <div id='nav-part2'>
            <UiSearchNavInputComp />
            <AccountCircleIcon style={{ 'color': 'white', fontSize: '40px', 'marginRight':'8px' }} />
        </div>


    </nav>)
}