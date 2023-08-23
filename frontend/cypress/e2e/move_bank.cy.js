describe('climbing move bank', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'SuperUser',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', () => {
    cy.contains('Climbing move bank')
    cy.contains('Welcome! Please sign in or create an account')
    cy.contains('Create account:')
  })

  it('login without credentials creates error', function() {
    cy.contains('Log in').click()
    cy.get('.error').contains('Incorrect username or password')
  })

  it('user can login', function () {
    cy.get('[data-testid="loginUsernameInput"]').type('root')
    cy.get('[data-testid="loginPasswordInput"]').type('sekret')
    cy.contains('Log in').click()
    cy.get('.success').contains('Welcome root')
    cy.contains('Latest activity:')
    cy.contains('Todo list for future projects:')
  })

  it('user can create an account', function () {
    cy.get('[data-testid="createAccountNameInput"]').type('Testikäyttäjä')
    cy.get('[data-testid="createAccountUsernameInput"]').type('testaaja')
    cy.get('[data-testid="createAccountPasswordInput"]').type('salainen')
    cy.get('[data-testid="createAccountButton').click()
    cy.get('.success').contains('Welcome testaaja')
    cy.contains('Latest activity:')
    cy.contains('Todo list for future projects:')
  })

  it('create account fails with duplicate username', function () {
    cy.get('[data-testid="createAccountNameInput"]').type('Testikäyttäjä')
    cy.get('[data-testid="createAccountUsernameInput"]').type('root')
    cy.get('[data-testid="createAccountPasswordInput"]').type('salainen')
    cy.get('[data-testid="createAccountButton').click()
    cy.get('.error').contains('unique')
  })
})