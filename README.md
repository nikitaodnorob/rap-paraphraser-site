## Rap-Paraphraser

Сервис для перефразирования текста любого типа (в том числе и одного слова) в семантическом поле русского репа с 
добавлением реп-сленга. Алгоритм перефразирования основан на использовании нейронной сети Word2Vec, обученной на 
текстах более чем 9500 песен русских исполнителей, которая находит близкие по семантике слова в контексте русского репа

<a href="https://github.com/nikitaodnorob/rap-paraphraser">
  <img alt="Build status" src="https://github.com/nikitaodnorob/rap-paraphraser/workflows/Build/badge.svg">
</a>

### Как запустить

Проект разрабатывался на Python 3.7

1. Установите Python библиотеки `gensim`, `pymorphy2`
2. Проверьте путь к интерпретатору Python в файлах `associate.py` и `rephrase.py`
3. В папке проекта в консоли выполните `python -m http.server --cgi 8000`
4. Проект запущен на `localhost:8000`

### Пример работы

#### Отрывок из "Мастер и Маргарита"

_**Оригинал**_

Никогда не разговаривайте с неизвестными. Однажды весною, в час небывало жаркого заката, в Москве, 
на Патриарших прудах, появились два гражданина.

_**Результат**_

Никогда не разговаривайте с неизвестными. Однажды весною, в **да-да-да-да-да-да-да-да-д кокаииииинннннного** жаркого 
**рассвета**, в **столице**, на Патриарших **вхламах**, появились два **артефакта**.
