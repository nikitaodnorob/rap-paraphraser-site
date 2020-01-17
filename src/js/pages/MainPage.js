import React from "react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"

export const MainPage = () => {
    return (
        <>
            <Header/>
            <p className="center">На нашем сайте Вы можете:</p>
            <p className="center">
                <Link to="/paraphraser">перефразировать текст</Link><br/>
                <Link to="/associations">подобрать слова-ассоциаты</Link>
            </p>
            { /*<p className="center">а так же просмотреть примеры:</p>*/ }
        </>
    )
}
