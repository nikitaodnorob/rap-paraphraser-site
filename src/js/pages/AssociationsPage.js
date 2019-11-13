import React from "react"
import $ from "jquery"

export class AssociationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.clearField = this.clearField.bind(this);
        this.searchAssociates = this.searchAssociates.bind(this);
        this.state = { isLoading: false, data: [] };
    }

    clearField() {
        $("#enterWord").val("");
        $("#result").text("");
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

        const { data } = this.state;
        let res = "";
        for (let i = 0; i < data.length; i++) {
            const dataItem = data[i];
            res += `${dataItem.word} (${dataItem.cos})\n`;
        }

        return (
            <React.Fragment>
                <h1>Rap-Paraphraser</h1>
                <p id="p1">
                    Добро пожаловать на сайт для перефразирования текста любого типа (в том числе и одного слова) в
                    семантическом поле русского репа с добавлением реп-сленга. Алгоритм перефразирования основан на
                    использовании нейронной сети Word2Vec, обученной на текстах более, чем 9500 песен русских
                    исполнителей,
                    которая находит близкие по семантике слова в контексте русского репа.
                </p>
                <div className="size14 associate-main-div">
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
                        <div id="result">{ res }</div>
                        <div>
                            <a>Перейти на стартовую страницу</a><br/>
                            <a>Перейти к перефразировке текста</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}