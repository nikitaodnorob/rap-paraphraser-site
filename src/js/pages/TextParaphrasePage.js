import React from "react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { getTextWithReplaces } from "../helpers/replaceText"
import { ResultField } from "../components/ResultField"
import axios from "axios"

export class TextParaphrasePage extends React.Component {

    constructor( props ) {
        super( props )
        this.clearField = this.clearField.bind( this )
        this.paraphraseText = this.paraphraseText.bind( this )
        this.state = { isLoading: false, data: "" }
    }

    clearField() {
        document.querySelector( "#enterText" ).value = ""
        this.setState( { data: "" } )

    }

    paraphraseText() {
        const text = document.querySelector( "#enterText" ).value
        this.setState( { isLoading: true } )
        axios
            .post( "cgi-bin/rephrase.py", `text=${ text }` )
            .then(
                response => this.setState( {
                    data: getTextWithReplaces( text, response.data ),
                    isLoading: false,
                } )
            )
    }

    render() {
        const { data = "", isLoading } = this.state
        return (
            <>
                <Header/>
                <div className="size14 main-div">
                    <div id="div1">
                        <p>Введите текст:</p>
                        <form>
                            <textarea name="text" id="enterText" defaultValue=""
                                className="size14"/>
                            <br/>
                            <div className="button-bar">
                                <button type="button" className="size14"
                                    onClick={ this.paraphraseText }>Отправить!
                                </button>
                                <button type="button" className="size14"
                                    onClick={ this.clearField }>Очистить
                                </button>
                            </div>
                        </form>
                    </div>
                    <div id="div2">
                        <p>Измененный текст:</p>
                        <ResultField text={ data } isLoading={ isLoading } baseClass="ws-pre-wrap"/>
                        <div>
                            <Link to="/">Перейти на стартовую страницу</Link><br/>
                            <Link to="/associations">Перейти к поиску ассоциатов</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
