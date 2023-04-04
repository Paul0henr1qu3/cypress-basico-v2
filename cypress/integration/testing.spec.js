///<reference types="Cypress" />

describe('Testing All Everything', function(){

    beforeEach(() => {
        cy.visit('https://google.com.br')
    })

    it('Calling Google', function(){
        cy.title().should('be.equal', 'Google')
        cy.fillAndSearchGoogle()
    })

})