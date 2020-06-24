import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Header} from '../components/Header';
import {ResultField} from '../components/ResultField';

export class AssociationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.clearField = this.clearField.bind(this);
        this.searchAssociates = this.searchAssociates.bind(this);
        this.state = {isLoading: false, data: []};
    }

    clearField() {
        document.querySelector('#enterWord').value = '';
        this.setState({data: []});
    }

    searchAssociates() {
        const word = document.querySelector('#enterWord').value;
        this.setState({isLoading: true});
        axios
            .get('cgi-bin/associate.py', {params: {word}})
            .then(response => this.setState({data: response.data, isLoading: false}));
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
                <Header/>
                <div className="size14 main-div">
                    <div id="div1">
                        <p>Введите слово:</p>
                        <form>
                            <input type="text" name="word" id="enterWord" defaultValue=""
                                className="size14"/>
                            <br/>
                            <div className="button-bar">
                                <button type="button" className="size14"
                                    onClick={this.searchAssociates}>Поиск
                                </button>
                                <button type="button" className="size14"
                                    onClick={this.clearField}>Очистить
                                </button>
                            </div>
                        </form>
                    </div>
                    <div id="div2">
                        <p>Слова ассоциаты:</p>
                        <ResultField text={res} isLoading={isLoading} baseClass="ws-pre"/>
                        <div>
                            <Link to="/">Перейти на стартовую страницу</Link><br/>
                            <Link to="/paraphraser">Перейти к перефразировке текста</Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
