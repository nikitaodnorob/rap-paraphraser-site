const apiHost = process.env.REACT_APP_API_HOST;

export const searchAssociates = (word) => {
    return fetch(`${apiHost}/associate?word=${word}`).then(res => res.json());
};

export const paraphraseText = (text) => {
    const data = new URLSearchParams();
    data.append('text', text);

    return fetch(`${apiHost}/rephrase`, {
        method: 'POST',
        body: data,
    }).then(res => res.json());
};
