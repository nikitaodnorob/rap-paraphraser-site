import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {TextParaphrasePage} from '../../pages/TextParaphrasePage';

describe('Test of TextParaphrasePage component', () => {

    test('TextParaphrasePage component render', () => {
        const {container} = render(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );
        expect(container).toMatchSnapshot();
    });

});
