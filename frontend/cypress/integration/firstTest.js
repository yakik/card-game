it('test', function () {
cy.visit('http://localhost:3000/')
cy.get('[name="playerName"]').type('ארז')
cy.get(':nth-child(8) > :nth-child(1)').click() 
})