import {getTextWithReplaces} from '../../helpers/replaceText';

describe('Test of getTextWithReplaces', () => {

    const sourceText = 'one   two three, four: five;   six';

    test('Test without replaces', () => {
        expect(getTextWithReplaces(sourceText)).toEqual(sourceText);
    });

    test('Test with empty replaces', () => {
        const replaces = [];
        expect(getTextWithReplaces(sourceText, replaces)).toEqual(sourceText);
    });

    test('Test with replace which modify text in start', () => {
        const replaces = [{position: 0, oldWord: 'one', newWord: '1'}];
        const resultText = '1   two three, four: five;   six';
        expect(getTextWithReplaces(sourceText, replaces)).toEqual(resultText);
    });

    test('Test with replace which modify text in middle', () => {
        const replaces = [{position: 23, oldWord: 'five', newWord: '5'}];
        const resultText = 'one   two three, four: 5;   six';
        expect(getTextWithReplaces(sourceText, replaces)).toEqual(resultText);
    });

    test('Test with replace which modify text in end', () => {
        const replaces = [{position: 31, oldWord: 'six', newWord: '6'}];
        const resultText = 'one   two three, four: five;   6';
        expect(getTextWithReplaces(sourceText, replaces)).toEqual(resultText);
    });

    test('Test with some replaces', () => {
        const replaces = [
            {position: 0, oldWord: 'one', newWord: '1'},
            {position: 23, oldWord: 'five', newWord: '5'},
            {position: 31, oldWord: 'six', newWord: '6'},
        ];
        const resultText = '1   two three, four: 5;   6';
        expect(getTextWithReplaces(sourceText, replaces)).toEqual(resultText);
    });

});
