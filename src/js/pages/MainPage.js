import React from "react"
import {Link} from "react-router-dom";
import {Header} from "../components/Header";

export const MainPage = () => {
    return (
        <React.Fragment>
            <Header/>
            <p className="center">На нашем сайте Вы можете:</p>
            <p className="center">
                {/*<a>перефразировать текст</a><br/>*/}
                <Link to="/associations">подобрать слова-ассоциаты</Link>
            </p>
            {/*<p className="center">а так же просмотреть примеры:</p>*/}
        </React.Fragment>
    )
};
