import React from "react";
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from '../src/App'

describe('<App />', () =>{
    // test('should work', () =>{
    //     render(<App />)
    //     screen.debug()

    //     expect(
    //         screen.getByText('Prueba tecnica react')
    //     ).toBeDefined()
    // })

    test('should add items and remove them', async()=>{
        const user = userEvent.setup()

        render(<App />)
        //Buscar el input
        const input = screen.getByRole('textbox')
        expect(input).toBeDefined()
        //Buscar el form
        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        const button = form.querySelector('button')
        expect(button).toBeDefined()

        await user.type(input, 'doqdev')
        await user.click(button!)

        //asegura que el elemento se ha agregado
        const list = screen.getByRole('list')
        expect(list).toBeDefined()

        expect(list.childNodes.length).toBe(1)
        
        //Asegura que se puede borrar
        const item = screen.getByText('doqdev')
        const removeButton = item.querySelector('button')
        expect(removeButton).toBeDefined()

        await user.click(removeButton!)
    })
})