import React from 'react';
import {Link} from 'react-router-dom';
import {Header} from '../components/Header';
import {ResultField} from '../components/ResultField';
import * as api from '../api';
import './css/AssociationsPage.css';

export class AssociationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.clearField = this.clearField.bind(this);
        this.searchAssociates = this.searchAssociates.bind(this);
        this.state = {isLoading: false, data: []};
    }

    clearField() {
        document.querySelector('.enter-word').value = '';
        this.setState({data: []});
    }

    searchAssociates() {
        const word = document.querySelector('.enter-word').value;
        this.setState({isLoading: true});
        api.searchAssociates(word)
            .then(data => this.setState({data: data, isLoading: false}));
    }

    render() {
        const {data = [], isLoading} = this.state;
        let res = '';
        for (let i = 0; i < data.length; i++) {
            const dataItem = data[i];
            res += `${dataItem.word} (${dataItem.cos})\n`;
        }

        return (
            <>
                <Header />
                <div className="main-div">
                    <div>
                        <p>Введите слово:</p>
                        <form>
                            <input type="text" name="word" className="enter-word" />
                            <br />
                            <div className="button-bar">
                                <button type="button" onClick={this.searchAssociates}>Поиск</button>
                                <button type="button" onClick={this.clearField}>Очистить</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <p>Слова ассоциаты:</p>
                        <ResultField text={res} isLoading={isLoading} baseClass="ws-pre" />
                        <div>
                            <Link to="/">Перейти на стартовую страницу</Link><br />
                            <Link to="/paraphraser">Перейти к перефразировке текста</Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
