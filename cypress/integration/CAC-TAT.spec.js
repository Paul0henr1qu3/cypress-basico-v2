/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function(){

    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it("Verifica titulo da aplicação", function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it("Preenche e envia o formulario", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
        .should('be.visible')
        .contains('Mensagem enviada com sucesso')

    })

    it('Mensagem de erro por enviar com formatação errada', function(){
        cy.get('[id="firstName"]').type('Paulo Henrique',{delay:0})
        cy.get('[id="lastName"]').type('Oliveira da Silva',{delay:0})
        cy.get('[id="email"]').type('paulogmail.com',{delay:0})
        cy.get('[id="phone"]').type('11978542548',{delay:0})
        cy.get('[id="open-text-area"]').type('Preciso de ajuda para entender mais de Cypress!, o que é preciso aprender primeiro? Qual indicação?',{delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('[class="error"]').should('be.visible')
    })

    it('Tentando colocar letras no campo telefone', function(){
        cy.get('[id="phone"]').type('Paulo Henrique')
        cy.get('[id="phone"').should('be.empty')
    })

    it('Telefone obrigatório não preenchido', function(){
        cy.get('#firstName').type('Paulo Henrique',{delay:0})
        cy.get('#lastName').type('Oliveira da Silva',{delay:0})
        cy.get('#email').type('paulogmail.com',{delay:0})
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Preciso de ajuda para entender mais de Cypress!, o que é preciso aprender primeiro? Qual indicação?',{delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Limpa os campos após preencher', function(){
        cy.get('[id="firstName"]').type('Paulo Henrique').should('have.value', 'Paulo Henrique').clear().should('be.empty')
        cy.get('[id="lastName"]').type('Oliveira da Silva').should('have.value', 'Oliveira da Silva').clear().should('be.empty')
        cy.get('[id="email"]').type('paulogmail.com').should('have.value', 'paulogmail.com').clear().should('be.empty')
        
        cy.get('[id="phone"]')
        .type('11978542548')
        .should('have.value', '11978542548')
        .clear()
        .should('be.empty')
    })

    it('Submete formulario sem preencher', function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){

        let product = 'mentoria'

        cy.get('#product').select(product).should('have.value', product)
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it("Marcando o Feedback como tipo de atendimento", function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it("Marcando cada tipo de atendimento", function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check().should('be.checked')
        .last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop' })
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json', { encoding: null}).as('exampleFile')
        cy.get('input[type="file"]')
        .selectFile('@exampleFile')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('selecionando multiplos arquivos', function(){
        cy.get('input[type="file"]')
        .selectFile([
            'cypress/fixtures/example.json', 
            'cypress/fixtures/example.txt'
        ])
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
            expect(input[0].files[1].name).to.equal('example.txt')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
        cy.get('#title').should('be.visible').contains('CAC TAT - Política de privacidade')
    })
})  