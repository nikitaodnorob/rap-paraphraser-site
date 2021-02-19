## Rap-Paraphraser

Сервис для перефразирования текста любого типа (в том числе и одного слова) в семантическом поле русского репа с 
добавлением реп-сленга. Алгоритм перефразирования основан на использовании нейронной сети Word2Vec, обученной на 
текстах более чем 9500 песен русских исполнителей, которая находит близкие по семантике слова в контексте русского репа

<a href="https://github.com/nikitaodnorob/rap-paraphraser">
  <img alt="Build status" src="https://github.com/nikitaodnorob/rap-paraphraser/workflows/Build/badge.svg">
  <img alt="Build status" src="https://github.com/nikitaodnorob/rap-paraphraser/workflows/Test/badge.svg">
</a><br/>

Список изменений (changelog): [CHANGELOG.MD](https://github.com/nikitaodnorob/rap-paraphraser/blob/master/CHANGELOG.md)

### Как запустить
Фронтенд проекта разернут на Heroku по адресу https://rap-paraphraser.herokuapp.com/

Бекенд проекта находится в отдельном [репозитории](https://github.com/nikitaodnorob/rap-paraphraser-backend) и развернут на Heroku по адресу https://rap-paraphraser-backend.herokuapp.com/

Для запуска фронтенда выполните:
* `git clone`
* `npm i`
* `npm start`

### Пример работы

#### Отрывок из "Мастер и Маргарита"

_**Оригинал**_

Никогда не разговаривайте с неизвестными. Однажды весною, в час небывало жаркого заката, в Москве, 
на Патриарших прудах, появились два гражданина.

_**Результат**_

Никогда не разговаривайте с неизвестными. Однажды весною, в **да-да-да-да-да-да-да-да-д кокаииииинннннного** жаркого 
**рассвета**, в **столице**, на Патриарших **вхламах**, появились два **артефакта**.
