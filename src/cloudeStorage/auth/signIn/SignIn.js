import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CloudStorageApiConfig} from "../../config/CloudStorageApiConfig";

const SignIn = () => {
    useEffect(() => {
        document.title = "Авторизация"
    })

    const navigate = useNavigate();

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async () => {
        try {
            const response = await CloudStorageApiConfig.post("http://localhost:8080/api/cloud-storage/v1/auth/sign-in",
                {login, password}, {
                    headers: {
                        'Content-type': "Application/json"
                    }
                }
            )
            if (response.status === 200) {
                alert("Авторизация успешна")
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate('/api/cloude-storage')
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
                <button id="registrationButton" type="button" onClick={handleSubmit}>Авторизоваться</button>

                <Link to="/api/cloude-storage/sign-up">Регистрация</Link>
            </div>
        </div>

    )
}

export default SignIn