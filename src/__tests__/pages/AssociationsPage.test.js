import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {AssociationsPage} from '../../pages/AssociationsPage';

describe('Test of AssociationsPage component', () => {

    test('AssociationsPage component render', () => {
        const {container} = render(
            <BrowserRouter>
                <AssociationsPage/>
            </BrowserRouter>
        );
        expect(container).toMatchSnapshot();
    });

});
