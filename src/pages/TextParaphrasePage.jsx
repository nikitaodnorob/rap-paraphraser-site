import React from 'react';
import {Link} from 'react-router-dom';
import {Header} from '../components/Header';
import {getTextWithReplaces} from '../helpers/replaceText';
import {ResultField} from '../components/ResultField';
import * as api from '../api';
import './css/TextParaphrasePage.css';

export class TextParaphrasePage extends React.Component {

    constructor(props) {
        super(props);
        this.clearField = this.clearField.bind(this);
        this.paraphraseText = this.paraphraseText.bind(this);
        this.state = {isLoading: false, data: ''};
    }

    clearField() {
        document.querySelector('.enter-text').value = '';
        this.setState({data: ''});

    }

    paraphraseText() {
        const text = document.querySelector('.enter-text').value;
        this.setState({isLoading: true});
        api.paraphraseText(text)
            .then(data => this.setState({
                data: getTextWithReplaces(text, data),
                isLoading: false,
            }));
    }

    render() {
        const {data = '', isLoading} = this.state;
        return (
            <>
                <Header />
                <div className="main-div">
                    <div>
                        <p>Введите текст:</p>
                        <form>
                            <textarea name="text" className="enter-text"/>
                            <br/>
                            <div className="button-bar">
                                <button type="button" onClick={this.paraphraseText}>
                                    Отправить!
                                </button>
                                <button type="button" onClick={this.clearField}>Очистить</button>
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
    }
}
