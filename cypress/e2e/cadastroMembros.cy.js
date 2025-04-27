/// <reference types='cypress'/>

describe('US_012 - Funcionalidade: Cadastro de Membros', () => {

  var email = `camila${Date.now()}@teste.com`

  beforeEach(() => {
    cy.visit('/');
  });

  it('Registro com todos os campos obrigatórios preenchidos', () => {
    cy.preencheCadastro('Camila', 'Moreira', email, '35988665522', 'SenhaForte@123');
    cy.get('#signup-response').should('contain', 'Cadastro realizado com sucesso!');
  });

  it('Validação do formato de e-mail inválido', () => {
    cy.preencheCadastro('Camila', 'Moreira', 'camila', '35988665522', 'SenhaForte@123');
    cy.get('#signup-response').should('contain', '{"message":"E-mail deve ser um email válido"}');
  });

  it('Validação de envio sem preencher os campos obrigatórios', () => {
    cy.get('#signup-firstname').type('Camila');
    cy.get('#signup-lastname').type('Moreira');
    cy.get('#signup-email').type(email);
    cy.get('#signup-phone').type('35988556644');
    // Sem preencher o campo senha
    cy.get('#signup-button').click();
    cy.get('#signup-response').should('contain', '{"message":"Senha não pode estar vazia"}');
  });

  it('Validação de bloqueio de senha fraca', () => {
    cy.preencheCadastro('Camila', 'Moreira', email, '35988665522', 'fraca');
    cy.get('#signup-response').should('contain', '{"message":"Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)"}');
  });

  it('Validação do link da política de privacidade', () => {
    cy.get('#signup-section > p > a').should('be.visible');
  });
})