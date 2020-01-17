import React from "react"
import $ from "jquery"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { getTextWithReplaces } from "../helpers/replaceText"
import { ResultField } from "../components/ResultField"

export class TextParaphrasePage extends React.Component {

    constructor( props ) {
        super( props )
        this.clearField = this.clearField.bind( this )
        this.paraphraseText = this.paraphraseText.bind( this )
        this.state = { isLoading: false, data: "" }
    }

    clearField() {
        $( "#enterText" ).val( "" )
        this.state.data = ""
    }

    paraphraseText() {
        const text = $( "#enterText" ).val()
        this.setState( { isLoading: true } )
        $.ajax( "cgi-bin/rephrase.py", {
            data: { text },
            method: "POST",
            success: ( data ) => {
                this.setState( {
                    data: getTextWithReplaces( text, JSON.parse( data ) ),
                    isLoading: false,
                } )
            },
        } )
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
