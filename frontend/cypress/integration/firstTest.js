import { messages, takiCardTypes, takiColors } from '../../src/constants'
import '@testing-library/cypress/add-commands'
import { getCardTestID } from '../../src/components/taki/cards'



const getCardText = (card) => {
    let cardText = '{{}"type":"' + card.type + '"'
    if (card.color !== undefined) {
        cardText += ',"color":"' + card.color + '"'
        if (card.number !== undefined)
            cardText += ',"number":"' + card.number + '"'
    }
    cardText += '{}}'
    return cardText
}

const addCardToPlayer = (cy, card) => {
    cy.findByTestId('test_text_for_new_card').type(getCardText(card))
    cy.findAllByText('הוסף קלף').click()
}

const takeCard = (cy) => {
    cy.findByTestId("take_card").click()
}

const selectChangeColor = (cy,color)=>{
    addCardToPlayer(cy, card_change_color)
    cy.findByTestId(getCardTestID(card_change_color)).click()
    cy.findByTestId("color_selection_"+color).click()
}

const selectKingWithColor = (cy,cardType,color)=>{
    addCardToPlayer(cy, card_king)
    cy.findByTestId(getCardTestID(card_king)).click()
    cy.findByTestId("king_selection_"+cardType).click()
    cy.findByTestId("color_selection_"+color).click()
}

const selectKingNoColor = (cy,cardType)=>{
    addCardToPlayer(cy, card_king)
    cy.findByTestId(getCardTestID(card_king)).click()
    cy.findByTestId("king_selection_"+cardType).click()
}

const selectSimpleCard = (cy,card)=>{
    addCardToPlayer(cy, card)
    cy.findByTestId(getCardTestID(card)).click()
}

let card_red_5 = { type: takiCardTypes.NUMBER, color: takiColors.RED, number: "5" }
let card_taki_green={ type: takiCardTypes.TAKI,  color:takiColors.GREEN}
let card_change_color = { type: takiCardTypes.CHANGE_COLOR }
let card_plus_three = { type: takiCardTypes.PLUS_THREE }
let card_break_plus_three = { type: takiCardTypes.PLUS_THREE_BREAK }
let card_king = { type: takiCardTypes.KING }
let card_plus_2_yellow = { type: takiCardTypes.PLUS_TWO, color: takiColors.YELLOW }
let card_plus_2_green = { type: takiCardTypes.PLUS_TWO, color: takiColors.GREEN }
let card_plus_2_red = { type: takiCardTypes.PLUS_TWO, color: takiColors.RED }
let card_plus_2_blue = { type: takiCardTypes.PLUS_TWO, color: takiColors.BLUE }

it('test', function () {
    cy.visit('http://localhost:3000/')

    cy.findByText('משחק טאקי לבדיקות').click()

    //starting always with player 0, next player is player 3
    selectSimpleCard(cy,card_red_5)

    cy.findByText('Player 2').click()
    takeCard(cy)
    cy.findByTestId("message_player").should('have.text', messages.NOT_YOUR_TURN)
    

    cy.findByText('Player 3').click()
    selectChangeColor(cy,takiColors.YELLOW)

    cy.findByText('Player 2').click()
    selectKingWithColor(cy,takiCardTypes.STOP,takiColors.YELLOW)
    cy.findByTestId("message_everyone").should('have.text', messages.itIsPlayerXTurn('0'))

    cy.findByText('Player 0').click()
    selectKingNoColor(cy,takiCardTypes.PLUS_THREE)
    cy.findByTestId("message_everyone").should('have.text', messages.everyoneShouldTakeThreeCardsExcept('0'))

    cy.findByText('Player 3').click()
    takeCard(cy)
    takeCard(cy)
    takeCard(cy)

    cy.findByText('Player 2').click()
    takeCard(cy)
    takeCard(cy)
    takeCard(cy)

    cy.findByText('Player 1').click()
    takeCard(cy)
    takeCard(cy)
    takeCard(cy)

    cy.findByText('Player 3').click()
    selectSimpleCard(cy,card_plus_2_yellow)


    
    

})

it('test2   q', function () {
    cy.visit('http://localhost:3000/')

    cy.findByText('משחק טאקי לבדיקות').click()
     //starting always with player 0, next player is player 3
    takeCard(cy)
    
    cy.findByText('Player 3').click()
    selectSimpleCard(cy,card_plus_2_yellow)

    cy.findByText('Player 2').click()
    selectSimpleCard(cy,card_plus_2_red)

    cy.findByText('Player 1').click()
    selectSimpleCard(cy,card_plus_2_blue)

    cy.findByText('Player 0').click()
    takeCard(cy)
    takeCard(cy)
    takeCard(cy)
    takeCard(cy)
    takeCard(cy)
    takeCard(cy)

    cy.findByText('Player 3').click()
    selectSimpleCard(cy,card_plus_three)

    cy.findByText('Player 1').click()
    selectSimpleCard(cy,card_break_plus_three)

    cy.findByText('Player 3').click()
    takeCard(cy)
    takeCard(cy)
    takeCard(cy)

    cy.findByText('Player 2').click()
    selectSimpleCard(cy,card_taki_green)
    
    
})