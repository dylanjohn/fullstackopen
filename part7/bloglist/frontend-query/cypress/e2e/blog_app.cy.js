describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'salainen',
    };
    const user2 = {
      name: 'Test User 2',
      username: 'testuser2',
      password: 'salainen2',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.get('#username');
    cy.get('#password');
    cy.get('#login').contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('salainen');
      cy.get('#login').click();
      cy.contains('Test User logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('wrongpass');
      cy.get('#login').click();
      cy.contains('Invalid username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'salainen' });
    });

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testblog.com',
      });

      cy.contains('Test Blog Title');
      cy.contains('Test Author');
    });

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testblog.com',
      });

      cy.contains('view').click();
      cy.contains('likes 0');
      cy.get('#like-button').click();
      cy.contains('likes 1');
    });

    it('creator can delete their blog', function () {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
      });

      cy.contains('Test Blog')
        .parent()
        .find('button')
        .contains('remove')
        .click({ force: true });
      cy.get('html').should('not.contain', 'http://test.com');
    });

    it('only creator can see delete button', function () {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
      });

      cy.contains('Test Blog')
        .parent()
        .find('button')
        .contains('remove')
        .should('exist');
      cy.contains('logout').click();
      cy.login({ username: 'testuser2', password: 'salainen2' });
      cy.contains('Test Blog')
        .parent()
        .find('button')
        .contains('remove')
        .should('not.exist');
    });

    it('blogs are ordered by likes', function () {
      cy.createBlog({
        title: 'Blog with least likes',
        author: 'Author1',
        url: 'http://test1.com',
      });
      cy.createBlog({
        title: 'Blog with most likes',
        author: 'Author2',
        url: 'http://test2.com',
      });
      cy.createBlog({
        title: 'Blog with second most likes',
        author: 'Author3',
        url: 'http://test3.com',
      });

      cy.contains('Blog with second most likes')
        .parent()
        .find('button')
        .contains('view')
        .click();
      cy.contains('Blog with second most likes')
        .parent()
        .find('button')
        .contains('like')
        .click();
      cy.wait(500);
      cy.contains('Blog with second most likes')
        .parent()
        .find('button')
        .contains('like')
        .click();

      cy.contains('Blog with most likes')
        .parent()
        .find('button')
        .contains('view')
        .click();
      cy.contains('Blog with most likes')
        .parent()
        .find('button')
        .contains('like')
        .click();
      cy.wait(500);
      cy.contains('Blog with most likes')
        .parent()
        .find('button')
        .contains('like')
        .click();
      cy.wait(500);
      cy.contains('Blog with most likes')
        .parent()
        .find('button')
        .contains('like')
        .click();

      cy.get('.blog-item').eq(0).should('contain', 'Blog with most likes');
      cy.get('.blog-item')
        .eq(1)
        .should('contain', 'Blog with second most likes');
      cy.get('.blog-item').eq(2).should('contain', 'Blog with least likes');
    });
  });
});
