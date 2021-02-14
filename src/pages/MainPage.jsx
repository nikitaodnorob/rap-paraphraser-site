import React from 'react';
import {Link} from 'react-router-dom';
import {Header} from '../components/Header';
import './css/MainPage.css';

export const MainPage = () => {
    return (
        <div className="main-page">
            <Header />
            <p>На нашем сайте Вы можете:</p>
            <p>
                <Link to="/paraphraser">перефразировать текст</Link><br />
                <Link to="/associations">подобрать слова-ассоциаты</Link>
            </p>
        </div>
    );
};
