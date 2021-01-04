const REACT_APP_API_HOST = 'http://localhost:8000';

export const searchAssociates = (word) => {
    return fetch(`${REACT_APP_API_HOST}/associate?word=${word}`).then(res => res.json());
};

export const paraphraseText = (text) => {
    const data = new URLSearchParams();
    data.append('text', text);

    return fetch(`${REACT_APP_API_HOST}/rephrase`, {
        method: 'POST',
        body: data,
    }).then(res => res.json());
};
