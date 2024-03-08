
import { RiLoader5Line } from "react-icons/ri";
import "../styles/Loader.css"


export function Loader(){
    return <div id="loader-container">
        <RiLoader5Line style={{width:'100%',height:'100%'}} id="loader-element"/>
    </div>
}