Cypress.Commands.add('preencheCadastro', (nome, sobrenome, email, telefone, senha) => {
    cy.get('#signup-firstname').type(nome);
    cy.get('#signup-lastname').type(sobrenome);
    cy.get('#signup-email').type(email);
    cy.get('#signup-phone').type(telefone);
    cy.get('#signup-password').type(senha);
    cy.get('#signup-button').click();
});