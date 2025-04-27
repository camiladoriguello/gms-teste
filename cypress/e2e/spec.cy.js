/// <reference types="cypress"/>

describe('US_012 - Funcionalidade: Cadastro de Membros', () => {
  it('Registro com todos os campos obrigatórios preenchidos', () => {
    cy.visit('127.0.0.1:8080');

    cy.get('#signup-firstname').type('Camila');
    cy.get('#signup-lastname').type('Moreira');
    cy.get('#signup-email').type('camilaa.moreira@teste.com');
    cy.get('#signup-phone').type('35988556878');
    cy.get('#signup-password').type('SenhaForte@123');
    cy.get('#signup-button').click();

    cy.get('#signup-response').should('contain', '{"message":"Este email já está cadastrado."}');
  });

  it('Validação do formato de e-mail inválido', () => {
    cy.visit('127.0.0.1:8080');

    cy.get('#signup-firstname').type('Camila');
    cy.get('#signup-lastname').type('Moreira');
    cy.get('#signup-email').type('camila');
    cy.get('#signup-button').click();

    cy.get('#signup-response').should('contain', '{"message":"E-mail deve ser um email válido"}');
  });

  it('Validação de envio sem preencher os campos obrigatórios', () => {
    cy.visit('127.0.0.1:8080');

    cy.get('#signup-firstname').type('Camila');
    cy.get('#signup-lastname').type('Moreira');
    cy.get('#signup-email').type('camila.moreira@teste.com');
    cy.get('#signup-phone').type('35988556878');
    // cy.get('#signup-password').type('SenhaForte@123'); -- Sem preencher
    cy.get('#signup-button').click();

    cy.get('#signup-response').should('contain', '{"message":"Senha não pode estar vazia"}');
  });

  it('Validação de bloqueio de senha fraca', () => {
    cy.visit('127.0.0.1:8080');

    cy.get('#signup-firstname').type('Camila');
    cy.get('#signup-lastname').type('Moreira');
    cy.get('#signup-email').type('camila.moreira@teste.com');
    cy.get('#signup-phone').type('35988556878');
    cy.get('#signup-password').type('fraca');
    cy.get('#signup-button').click();

    cy.get('#signup-response').should('contain', '{"message":"Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)"}');
  });

  it('Validação do link da política de privacidade', () => {
    cy.visit('127.0.0.1:8080');
    
    cy.get('#signup-section > p > a').click();

    //cy.get('h1').should('contain', 'Política de Privacidade');
  });
})

describe('US_001 - Funcionalidade: Busca de Filmes', () => {
  it('Busca de filmes com uma palavra chave válida', () => {
    cy.visit('127.0.0.1:8080');
    
    cy.get('#search-input').type('Lion King');
    cy.get('#search-button').click();
    cy.get('#results-section > div > h3').should('be.visible');
  });

  it('Busca de filmes com uma palavra chave inválida / sem correspondência', () => {
    cy.visit('127.0.0.1:8080');
    
    cy.get('#search-input').type('Inválido');
    cy.get('#search-button').click();
    cy.get('#results-section > p').should('contain', 'Filme não encontrado.');
  });

  it('Validação da "limpeza" do campo de busca', () => {
    cy.visit('127.0.0.1:8080');
    
    cy.get('#search-input').type('Lion King');
    cy.get('#search-button').click();
    cy.get('#results-section > div > h3').should('be.visible');
    
    cy.get('#clear-button').click();
    cy.get('#results-section > div > h3').should('not.exist');
  });
});