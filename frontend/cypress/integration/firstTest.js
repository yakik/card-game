import { takiCardTypes, takiColors } from '../../src/constants'
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
    cy.get('input').type(getCardText(card))
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
let card_change_color = { type: takiCardTypes.CHANGE_COLOR }
let card_plus_three = { type: takiCardTypes.PLUS_THREE }
let card_king = { type: takiCardTypes.KING }

it('test', function () {
    cy.visit('http://localhost:3000/')

    cy.findByText('משחק טאקי לבדיקות').click()

    //starting always with player 0, next player is player 3
    selectSimpleCard(cy,card_red_5)

    cy.findByText('Player 2').click()
    takeCard(cy)
    cy.findByTestId("message_player").should('have.text', 'לא תורך')
    

    cy.findByText('Player 3').click()
    selectChangeColor(cy,takiColors.YELLOW)

    cy.findByText('Player 2').click()
    selectKingWithColor(cy,takiCardTypes.STOP,takiColors.YELLOW)
    cy.findByTestId("message_everyone").should('have.text', 'תורו של 0 ')

    cy.findByText('Player 0').click()
    selectKingNoColor(cy,takiCardTypes.PLUS_THREE)
    cy.findByTestId("message_everyone").should('have.text', 'כולם חוץ מ 0לקחת שלושה קלפים')

})