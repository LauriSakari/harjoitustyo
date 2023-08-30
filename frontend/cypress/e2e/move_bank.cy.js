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
      .and('have.css', 'color', 'rgb(216, 0, 12)')
    cy.contains('Home').should('not.exist')
  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('[data-testid="loginUsernameInput"]').type('root')
      cy.get('[data-testid="loginPasswordInput"]').type('sekret')
      cy.contains('Log in').click()
    })

    it('a new todo can be created', function() {
      cy.get('[data-testid="addTodoInput"]').type('test todo')
      cy.get('[data-testid="addTodoButton"]').click()
      cy.get('[data-testid="addTodoInput"]').should('have.value', '')
      cy.contains('test todo')
      cy.wait(1000)
      cy.get('.success').should('exist')
    })

    it('empty todo can not be created', function() {
      cy.wait(500)
      cy.get('[data-testid="addTodoButton"]').click()
      cy.wait(500)
      cy.contains('Delete').should('not.exist')
      cy.wait(1000)
      cy.get('.error').should('exist')
    })

    it('added todo can be deleted', function() {
      cy.get('[data-testid="addTodoInput"]').type('test todo')
      cy.get('[data-testid="addTodoButton"]').click()
      cy.get('[data-testid="addTodoInput"]').should('have.value', '')
      cy.contains('test todo')
      cy.get('[data-testid="deleteTodoButton"]').click()
      cy.wait(500)
      cy.contains('test todo').should('not.exist')
    })

    it('navbar links work', function() {
      cy.get('[data-testid="boulderLink"]').click()
      cy.contains('Boulder Grades')
      cy.get('[data-testid="sportLink"]').click()
      cy.contains('Sport Grades')
      cy.get('[data-testid="activityLink"]').click()
      cy.contains('Your Activity')
      cy.get('[data-testid="homeLink"]').click()
      cy.contains('Hello root')
    })

    it('user can log out', function() {
      cy.get('[data-testid="logoutButton"]').click()
      cy.get('[data-testid="loginUsernameInput"]').should('exist')
      cy.get('.success').should('exist')
        .and('contain', 'logged out')
    })

    it('user can add boulder climbs with form', function() {
      cy.get('[data-testid="boulderLink"]').click()
      cy.contains('No sends yet')
      cy.get('#grade').select('6B')
      cy.get('#routesClimbed').clear()
      cy.get('#routesClimbed').type(2)
      cy.get('[data-testid="addRoutesButton"]').click()
      cy.get('#date').click()
      cy.get('#date').type('2023-10-10')
      cy.get('#notes').type('muistiinpano')
      cy.get('[data-testid="submitRoutesButton"]').click()
      cy.get('[data-testid="climbsTable"]').should('contain', '6B')
        .and('contain', '2')
    })
  })

})