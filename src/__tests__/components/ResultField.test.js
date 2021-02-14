import React from 'react';
import {render} from '@testing-library/react';
import {ResultField} from '../../components/ResultField';

describe('Test of ResultField component', () => {

    test('ResultField component render without props', () => {
        const {container} = render(<ResultField />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('ResultField component render with text', () => {
        const {container} = render(
            <ResultField text="testText"/>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    test('ResultField component render with class', () => {
        const {container} = render(
            <ResultField baseClass="testClass"/>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    test('ResultField component render with class and loading', () => {
        const {container} = render(
            <ResultField baseClass="testClass" isLoading={true}/>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    test('ResultField component render with class, text and loading', () => {
        const {container} = render(
            <ResultField baseClass="testClass" text="testText" isLoading={true}/>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

});
