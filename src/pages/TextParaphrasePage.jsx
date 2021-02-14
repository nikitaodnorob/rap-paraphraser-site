import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {Header} from '../components/Header';
import {getTextWithReplaces} from '../helpers/replaceText';
import {ResultField} from '../components/ResultField';
import * as api from '../api';
import './css/TextParaphrasePage.css';

export const TextParaphrasePage = () => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const searchFieldRef = useRef(null);

    const clearField = () => {
        searchFieldRef.current.value = '';
        setData('');
    };

    const paraphraseText = async () => {
        const text = searchFieldRef.current.value;
        setLoading(true);

        const result = await api.paraphraseText(text);
        setData(getTextWithReplaces(text, result));
        setLoading(false);
    };

    return (
        <>
            <Header />
            <div className="main-div">
                <div>
                    <p>Введите текст:</p>
                    <form>
                        <textarea name="text" className="enter-text" ref={searchFieldRef} />
                        <br/>
                        <div className="button-bar">
                            <button type="button" onClick={paraphraseText}>
                                Отправить!
                            </button>
                            <button type="button" onClick={clearField}>Очистить</button>
                        </div>
                    </form>
                </div>
                <div>
                    <p>Измененный текст:</p>
                    <ResultField text={data} isLoading={isLoading} baseClass="ws-pre-wrap"/>
                    <div>
                        <Link to="/">Перейти на стартовую страницу</Link><br/>
                        <Link to="/associations">Перейти к поиску ассоциатов</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
