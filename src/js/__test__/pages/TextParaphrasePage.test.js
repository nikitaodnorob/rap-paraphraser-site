import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextParaphrasePage } from "../../pages/TextParaphrasePage";
import { BrowserRouter } from "react-router-dom";

Enzyme.configure( { adapter: new Adapter() } );

describe( "Test of TextParaphrasePage component", () => {

    test( "TextParaphrasePage component render", () => {
        const component = renderer.create(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );
        expect( component.toJSON() ).toMatchSnapshot();
    } );

    test( "Initial state is correct", () => {
        const component = mount(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );
        expect( component.find( "TextParaphrasePage" ).state() ).toEqual( { isLoading: false, data: "" } );
    } );

    test( "TextParaphrasePage component render with data", () => {
        const component = mount(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );

        component.find( "TextParaphrasePage" ).setState( { data: "rephrased text" } );

        expect( component.find( "ResultField" ).props().text ).toEqual( "rephrased text" );
    } );

    test( "TextParaphrasePage component render with undefined data", () => {
        const component = mount(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );

        component.find( "TextParaphrasePage" ).setState( { data: undefined } );

        expect( component.find( "ResultField" ).props().text ).toEqual( "" );
    } );

    test( "clearField function is working", () => {
        const component = mount(
            <BrowserRouter>
                <TextParaphrasePage/>
            </BrowserRouter>
        );

        component.find( "TextParaphrasePage" ).setState( { data: "rephrased text" } );
        component.find( ".button-bar button" ).at( 1 ).simulate( "click" );

        expect( component.find( "TextParaphrasePage" ).state().data ).toEqual( "" );
    } )

} );