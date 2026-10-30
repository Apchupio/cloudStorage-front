import React, {useEffect, useState} from 'react'
import './SignUpCss.css'
import {Link} from "react-router-dom";
import {CloudStorageApiConfig} from "../../config/CloudStorageApiConfig";

const SignUp = () => {
    useEffect(()  => {
        document.title = "Регситрация"
    })

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [matchPassword, setMatchPassword] = useState('')


    const handleSubmit = async () => {
        try {
            const response = await CloudStorageApiConfig.post("http://localhost:8080/api/cloud-storage/v1/auth/sign-up", {
                login, password, matchPassword}, {
                    headers: {
                        'Content-type': 'application/json'
                    }
            });
            if (response.status === 201) {
                alert("Регистрация успешна")
            }
        }
        catch (error) {

        }
    }


    return (
        <div>
            <div className="registrationWindow">
                <input
                    id="loginField"
                    type="text"
                    name="login"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    id="passwordField"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    id="matchPasswordField"
                    type="password"
                    name="matchPassword"
                    placeholder="Повтор пароля"
                    value={matchPassword}
                    onChange={(e) => setMatchPassword(e.target.value)}
                />
                <button id="registrationButton" type="button" onClick={handleSubmit}>Зарегистрироваться</button>

                <Link to="/api/cloude-storage/sign-in">Авторизация</Link>
            </div>
        </div>

    )
}
export default SignUp
