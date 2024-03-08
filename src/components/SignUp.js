import { useEffect, useState } from "react"
import { SIGNUP_URL, APP_TYPE, PROJECT_ID } from "./Constants"
import '../styles/SignUp.css'
import logo from './Amazon-India-Logo-PNG-HD.png'
import InfoIcon from '@mui/icons-material/Info';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { NavLink } from "react-router-dom";

export function SignUp() {

    const [getUserName, setUserName] = useState('')
    const [getEmailId, setEmailId] = useState('')
    const [getPassword, setPassword] = useState('')

    async function ApiCallForSignUp(user) {
        try {
            let response = await fetch(SIGNUP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectId': PROJECT_ID
                },
                body: JSON.stringify({ ...user })
            })
            let result = await response.json()
            console.log(result)
        } catch (error) {
            alert(error)
        }
    }

    function userNameHandler(e) {
        setUserName(prev => e.target.value)
    }
    function emailHandler(e) {
        setEmailId(prev => e.target.value)
    }
    function passwordHandler(e) {
        setPassword(prev => e.target.value)
    }
    function formSubmitHandler(e) {
        e.preventDefault()
        const user = {
            name: getUserName,
            email: getEmailId,
            password: getPassword,
            appType: APP_TYPE
        }
        ApiCallForSignUp(user)
    }
    return (<div id="signUp-component">
        <div id="signUp-logo-container"><img id="signUp-logo" src={logo} /></div>
        <div id="signUp-card">
            <h1 id="signUp-heading">Create account</h1>
            <form onSubmit={formSubmitHandler}>
                <label htmlFor="">Your name</label>
                <br />
                <input className="signUp-input" placeholder="First and last name" type="text" required name="name" value={getUserName} onChange={userNameHandler} />
                <br />
                <label htmlFor="">Email</label>
                <br />
                <input className="signUp-input" type="email" required name="email" value={getEmailId} onChange={emailHandler} />
                <br />
                <label htmlFor="">Password</label>
                <br />
                <input id="signUp-password-box" className="signUp-input" placeholder="At least 6 characters" type="password" required name="password" value={getPassword} onChange={passwordHandler} />
                <br />
                <div id="signUp-password-box-info"><InfoIcon style={{ fontSize: '13px', color: 'skyblue' }} /> Passwords must be atleast 6 characters</div>
                <label htmlFor="">Password again</label>
                <br />
                <input className="signUp-input" type="password" required />
                <br />
                <button className="signUp-input" id="signUp-button" type="submit">Create your Amazon account</button>
            </form>

            <div id="signUp-guidelines">By creating an account or logging in, you agree to Amazon's <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=200545940" target="_blank">Conditions of Use</a> and <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_register_notification_privacy_notice?ie=UTF8&nodeId=200534380" target="_blank">Privacy Policy</a>.</div>

            <hr></hr>

            <div>Already have an account? <NavLink to="/login" id="signUp-anchor-flex">Sign in <ArrowRightIcon style={{ fontSize: '13px' }} /></NavLink></div>
        </div>

    </div>)
}