import axios from 'axios'
import React from "react"
import { act, render, screen, fireEvent, waitForElement, wait } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { Taki } from './taki/taki'
import { Start } from './start'
import { takiCardTypes } from '../constants'

jest.mock('axios');
jest.mock('./taki/taki', () => ({
    Taki: jest.fn(()=> <div>AAAAA</div>)
}))

describe("taki tests", () => {


    test("grid functioning", async () => {
       

        const resp = { data: { gameID: '3', playerID: 'Erez' } };
        axios.post.mockResolvedValue(resp);
        Taki.mockReturnValueOnce(<div>VVVVV</div>).mockReturnValueOnce(<div>YYYY</div>).mockReturnValueOnce(<div>ZZZZZ</div>)

        const { getByText, getByTestId, debug } = render(
            <Start ></Start>);
        //debug()
        expect(getByText("משחק טאקי חדש")).toBeDisabled()
        
        await act(async() => {
            await userEvent.type(screen.getByRole('nameInput'), 'Erez')
        })
        expect(getByText("משחק טאקי חדש")).not.toBeDisabled()

        await act(async() => {
            await userEvent.click(screen.getByText('משחק טאקי חדש'))
        })
        screen.debug()
        expect(Taki).toHaveBeenCalled()
    })

});

