import '../../styles/NavComponent/UiSearchNavInputComp.css'
import SearchIcon from '@mui/icons-material/Search';

export function UiSearchNavInputComp(){
    return (
        <div id="searchIcon-plus-inputBox">
        <label htmlFor="inputBox"><SearchIcon style={{'marginRight':'10px', fontSize:'large', color:'grey'}}/></label>
        <input placeholder="Search..." id="inputBox"/>
    </div>
    )
}