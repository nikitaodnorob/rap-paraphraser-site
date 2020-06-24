import React from 'react';
import renderer from 'react-test-renderer';
import {describe, expect, test} from '@jest/globals';
import {ResultField} from '../../components/ResultField';

describe('Test of ResultField component', () => {

    test('ResultField component render without props', () => {
        const component = renderer.create(
            <ResultField/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('ResultField component render with text', () => {
        const component = renderer.create(
            <ResultField text="testText"/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('ResultField component render with class', () => {
        const component = renderer.create(
            <ResultField baseClass="testClass"/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('ResultField component render with class and loading', () => {
        const component = renderer.create(
            <ResultField baseClass="testClass" isLoading={true}/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('ResultField component render with class, text and loading', () => {
        const component = renderer.create(
            <ResultField baseClass="testClass" text="testText" isLoading={true}/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

});
