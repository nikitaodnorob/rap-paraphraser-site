/* global describe, test, expect, beforeAll */
import React from "react"
import renderer from "react-test-renderer"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { AssociationsPage } from "../../pages/AssociationsPage"
import { BrowserRouter } from "react-router-dom"

Enzyme.configure( { adapter: new Adapter() } )

describe( "Test of AssociationsPage component", () => {

    beforeAll( () => {
        const div = document.createElement( "div" )
        window.domNode = div
        document.body.appendChild( div )
    } )

    test( "AssociationsPage component render", () => {
        const component = renderer.create(
            <BrowserRouter>
                <AssociationsPage/>
            </BrowserRouter>
        )
        expect( component.toJSON() ).toMatchSnapshot()
    } )

    test( "Initial state is correct", () => {
        const component = mount(
            <BrowserRouter>
                <AssociationsPage/>
            </BrowserRouter>
        )
        expect( component.find( "AssociationsPage" ).state() ).toEqual( {
            isLoading: false,
            data: [],
        } )
    } )

    test( "AssociationsPage component render with data", () => {
        const component = mount(
            <BrowserRouter>
                <AssociationsPage/>
            </BrowserRouter>
        )

        const data = [
            { word: "word1", cos: "0.1" },
            { word: "word2", cos: "0.2" },
        ]
        const resultText = "word1 (0.1)\nword2 (0.2)\n"

        component.find( "AssociationsPage" ).setState( { data } )

        expect( component.find( "ResultField" ).props().text ).toEqual( resultText )
    } )

    test( "AssociationsPage component render with undefined data", () => {
        const component = mount(
            <BrowserRouter>
                <AssociationsPage/>
            </BrowserRouter>
        )

        component.find( "AssociationsPage" ).setState( { data: undefined } )

        expect( component.find( "ResultField" ).props().text ).toEqual( "" )
    } )

    test( "clearField function is working", () => {
        const component = mount(
            <BrowserRouter>
                <AssociationsPage/>
            </BrowserRouter>,
            { attachTo: window.domNode }
        )

        const data = [
            { word: "word1", cos: "0.1" },
            { word: "word2", cos: "0.2" },
        ]
        component.find( "AssociationsPage" ).setState( { data } )
        component.find( ".button-bar button" ).at( 1 ).simulate( "click" )

        expect( component.find( "AssociationsPage" ).state().data ).toHaveLength( 0 )
    } )

} )