import React from 'react';
import renderer from 'react-test-renderer';
import { Header } from "../../components/Header";

describe( "Test of Header component", () => {

    test( "Header component render", () => {
       const component = renderer.create(
           <Header/>
       );
       expect( component.toJSON() ).toMatchSnapshot();
    } );

} );