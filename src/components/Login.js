import { useEffect, useState } from "react"
import { LOGIN_URL, APP_TYPE, PROJECT_ID } from "./Constants"
import '../styles/Login.css'
import logo from './Amazon-India-Logo-PNG-HD.png'
import { useNavigate } from "react-router-dom"

export function Login() {
    const [getEmailId, setEmailId] = useState('')
    const [getPassword, setPassword] = useState('')
    const navigate = useNavigate()

    async function ApiCallForLogin(user) {
        try {
            let response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectId': PROJECT_ID
                },
                body: JSON.stringify({ ...user })
            })
            let result = await response.json()
            console.log(result)
            if (!response.ok) {
                alert('Login failed')
                return
            }
            alert('Login Success')
        localStorage.setItem('token', JSON.stringify(result.token))
        } catch (error) {
            alert(error)
        }
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
            email: getEmailId,
            password: getPassword,
            appType: APP_TYPE
        }
        // localStorage.setItem('user', JSON.stringify(user))
        ApiCallForLogin(user)
    }
    function navigationToSignUpPageHandler() {
        navigate('/signUp')
    }
    return (<div id="login-component">
        <div id="login-logo-container"><img id="login-logo" src={logo} /></div>
        <div id="login-card">
            <h1 id="login-heading">Sign in</h1>
            <form onSubmit={formSubmitHandler}>
                <label htmlFor="">Email</label>
                <br />
                <input id="login-email-input" className="login-input" type="email" required name="email" value={getEmailId} onChange={emailHandler} />
                <br />
                <label htmlFor="">Password</label>
                <br />
                <input className="login-input"  type="password" required name="password" value={getPassword} onChange={passwordHandler} />
                <br />
                <button className="login-input" id="login-button" type="submit">Sign in</button>
            </form>
            <div id="login-guidelines">By continuing, you agree to Amazon's <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=200545940" target="_blank">Conditions of Use</a> and <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_register_notification_privacy_notice?ie=UTF8&nodeId=200534380" target="_blank">Privacy Policy</a>.</div>
            <div id="login-ask-for-keep-signed"><input type="checkbox" />Keep me signed in.</div>
            <div id="login-query-style">New to Amazon?</div>
            <button id="navigate-to-signUp-page" onClick={navigationToSignUpPageHandler}>Create your Amazon Account</button>

        </div>

    </div>)
}