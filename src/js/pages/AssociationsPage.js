import React from "react"
import $ from "jquery"
import {Link} from "react-router-dom";
import {Header} from "../components/Header";
import {ResultField} from "../components/ResultField";

export class AssociationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.clearField = this.clearField.bind(this);
        this.searchAssociates = this.searchAssociates.bind(this);
        this.state = { isLoading: false, data: [] };
    }

    clearField() {
        $("#enterWord").val("");
        this.state.data = [];
    }

    searchAssociates() {
        const word = $("#enterWord").val();
        this.setState({ isLoading: true });
        $.ajax("cgi-bin/associate.py", {
            data: { word },
            method: "GET",
            success: (data) => {
                this.setState({ data: JSON.parse(data), isLoading: false });
            }
        });
    }

    render() {

        const { data = [], isLoading } = this.state;
        let res = "";
        for (let i = 0; i < data.length; i++) {
            const dataItem = data[i];
            res += `${dataItem.word} (${dataItem.cos})\n`;
        }

        return (
            <React.Fragment>
                <Header/>
                <div className="size14 main-div">
                    <div id="div1">
                        <p>Введите слово:</p>
                        <form>
                            <input type="text" name="word" id="enterWord" defaultValue="" className="size14"/>
                            <br/>
                            <div className="button-bar">
                                <button type="button" className="size14" onClick={this.searchAssociates}>Поиск</button>
                                <button type="button" className="size14" onClick={this.clearField}>Очистить</button>
                            </div>
                        </form>
                    </div>
                    <div id="div2">
                        <p>Слова ассоциаты:</p>
                        <ResultField text = {res} isLoading = {isLoading} baseClass = "ws-pre" />
                        <div>
                            <Link to="/">Перейти на стартовую страницу</Link><br/>
                            <Link to="/paraphraser">Перейти к перефразировке текста</Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}