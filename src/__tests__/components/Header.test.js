import React from 'react';
import {render} from '@testing-library/react';
import {Header} from '../../components/Header';

describe('Test of Header component', () => {

    test('Header component render', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });

});
