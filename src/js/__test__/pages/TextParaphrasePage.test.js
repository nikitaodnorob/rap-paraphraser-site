import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import {afterEach, beforeEach, describe, expect, test} from '@jest/globals';
import {BrowserRouter} from 'react-router-dom';
import {TextParaphrasePage} from '../../pages/TextParaphrasePage';

Enzyme.configure({adapter: new Adapter()});

describe('Test of TextParaphrasePage component', () => {

    beforeEach(() => {
        const div = document.createElement('div');
        div.setAttribute('id', 'testContainer');
        document.body.appendChild(div);
    });

    afterEach(() => {
        const div = document.querySelector('#testContainer');
        if (div) document.body.removeChild(div);
    });

    test('TextParaphrasePage component render', () => {
        const component = renderer.create(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('Initial state is correct', () => {
        const component = mount(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );
        expect(component.find('TextParaphrasePage').state()).toEqual({
            isLoading: false,
            data: '',
        });
    });

    test('TextParaphrasePage component render with data', () => {
        const component = mount(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );

        component.find('TextParaphrasePage').setState({data: 'rephrased text'});

        expect(component.find('ResultField').props().text).toEqual('rephrased text');
    });

    test('TextParaphrasePage component render with undefined data', () => {
        const component = mount(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );

        component.find('TextParaphrasePage').setState({data: undefined});

        expect(component.find('ResultField').props().text).toEqual('');
    });

    test('clearField function is working', () => {
        const component = mount(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>,
            {attachTo: document.querySelector('#testContainer')}
        );

        component.find('TextParaphrasePage').setState({data: 'rephrased text'});
        component.find('.button-bar button').at(1).simulate('click');

        expect(component.find('TextParaphrasePage').state().data).toEqual('');
    });

    test ('searchAssociates function is working', () => {
        const component = mount(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>,
            {attachTo: document.querySelector('#testContainer')}
        );

        document.querySelector('#enterText').value = 'testText';

        let postURL = '', postData = {};

        const testPostPromise = new Promise((resolve) => {
            return resolve({response: {data: 'testResult'}});
        });

        // Заменяем axios.post для проверки корректности параметров
        axios.post = (url, data) => {
            postURL = url;
            postData = data;
            return testPostPromise;
        };

        component.find('.button-bar button').at(0).simulate('click');

        expect(postURL).toEqual('cgi-bin/rephrase.py');
        expect(postData).toEqual('text=testText');
    });

});
