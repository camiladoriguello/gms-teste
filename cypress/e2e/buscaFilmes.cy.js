/// <reference types="cypress"/>

describe('US_001 - Funcionalidade: Busca de Filmes', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('Busca de filmes com uma palavra chave válida', () => {
    cy.get('#search-input').type('Lion King');
    cy.get('#search-button').click();
    cy.get('#results-section > div > h3').should('be.visible');
  });

  it('Busca de filmes com uma lista', () => {
    cy.fixture('filmes').each((filmes) => {
      cy.get('#search-input').clear().type(filmes.titulo);
      cy.get('#search-button').click();
      cy.get('#results-section').should('contain', filmes.titulo)
    });
  });

  it('Busca de filmes com uma palavra chave inválida / sem correspondência', () => {
    cy.get('#search-input').type('Inválido');
    cy.get('#search-button').click();
    cy.get('#results-section > p').should('contain', 'Filme não encontrado.');
  });

  it('Validação da "limpeza" do campo de busca', () => {
    cy.get('#search-input').type('Lion King');
    cy.get('#search-button').click();
    cy.get('#results-section > div > h3').should('be.visible');

    cy.get('#clear-button').click();
    cy.get('#search-input').should('be.empty');
  });
});