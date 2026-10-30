import React from 'react';
import '../css/HeaderCss.css'
import {CloudStorageApiConfig} from "../config/CloudStorageApiConfig";
import {useNavigate} from "react-router-dom";

const Header = ({onTogglePhrases, onToggleTranslations, showPhrases, showTranslations, onSuccess}) => {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await CloudStorageApiConfig.post("http://localhost:8080/api/cloud-storage/v1/auth/sign-out", null)
            if (response.status === 200) {
                navigate("/api/cloude-storage/sign-in");
            }
        } catch (error) {
        }
    }

    return (
        <header className="app-header">
            <div className="app-header__inner">
                <h1 className="app-header__title">CloudStorage</h1>
                <div className="app-header__buttons">

                    <button
                        className="btn btn-toggle"
                        onClick={logout}
                    >
                    <span className="btn-toggle__label">
                         Выйти
                    </span>
                    </button>
                </div>
            </div>

        </header>
    );
};

export default Header;