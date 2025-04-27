/// <reference types="cypress"/>

describe('US_012 - Funcionalidade: Cadastro de Membros', () => {
  it('Cadastro de Campos Obrigatórios', () => {
    cy.visit('127.0.0.1:8080');

    cy.get('#signup-firstname').type('Camila');
    cy.get('#signup-lastname').type('Moreira');
    cy.get('#signup-email').type('camilaa.moreira@teste.com');
    cy.get('#signup-phone').type('35988556878');
    cy.get('#signup-password').type('SenhaForte@123');
    cy.get('#signup-button').click();

    cy.get('#signup-response').should('contain', 'Cadastro realizado com sucesso!')
  })
})