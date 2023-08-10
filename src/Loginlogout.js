import React, { useState } from "react"
import { database } from "./Firebaseconfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import "./Loginlogout.scss"
function Loginlogout() {

    const [login, setLogin] = useState(false)
    const history = useNavigate();

    const handlesubmit = (e, type) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        if (type == 'signup') {

            createUserWithEmailAndPassword(database, email, password).then(data => {
                console.log(data, "authData")
                history("/Home")
            }).catch(err => {
                alert(err.code)
                setLogin(true)
            })

        } else {
            signInWithEmailAndPassword(database, email, password).then(data => {
                console.log(data, "authData")
                history("/Home")
            }).catch(err => {
                alert(err.code)
            })

        }
    }


    return (
        <>
            <div className="App" id="login">
                <div className="rowlog">
                    <div className={login == false ? 'activeColour' : 'pointer'} onClick={() => setLogin(false)} id="signup">SignUp</div>
                    <div className={login == true ? 'activeColour' : 'pointer'} onClick={() => setLogin(true)} id="signin">SignIn</div>
                </div>
                <h1 id="suorsi">{login ? 'SignIn' : 'SignUp'} </h1>
                <form onSubmit={(e) => handlesubmit(e, login ? 'singin' : 'signup')}>
                    <input id="emailid" name="email" placeholder="Email" /><br />
                    <input id="pw" name="password" type="password" placeholder="Password" /><br />
                    <button id="btn2">{login ? 'SignIn' : 'SignUp'}</button>
                </form>
            </div>

        </>
    )
}

export default Loginlogout


