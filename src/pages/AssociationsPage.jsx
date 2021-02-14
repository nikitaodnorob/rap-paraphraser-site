import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import {Header} from '../components/Header';
import {ResultField} from '../components/ResultField';
import * as api from '../api';
import './css/AssociationsPage.css';

export const AssociationsPage = () => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const searchFieldRef = useRef(null);

    const clearField = () => {
        searchFieldRef.current.value = '';
        setData([]);
    };

    const searchAssociates = async () => {
        const word = searchFieldRef.current.value;
        setLoading(true);

        const result = await api.searchAssociates(word);
        setData(result);
        setLoading(false);
    };

    const resText = data.map((dataItem) => `${dataItem.word} (${dataItem.cos})`).join('\n');

    return (
        <>
            <Header />
            <div className="main-div">
                <div>
                    <p>Введите слово:</p>
                    <form>
                        <input
                            type="text"
                            name="word"
                            className="enter-word"
                            ref={searchFieldRef}
                        />
                        <br />
                        <div className="button-bar">
                            <button type="button" onClick={searchAssociates}>Поиск</button>
                            <button type="button" onClick={clearField}>Очистить</button>
                        </div>
                    </form>
                </div>
                <div>
                    <p>Слова ассоциаты:</p>
                    <ResultField text={resText} isLoading={isLoading} baseClass="ws-pre" />
                    <div>
                        <Link to="/">Перейти на стартовую страницу</Link><br />
                        <Link to="/paraphraser">Перейти к перефразировке текста</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
