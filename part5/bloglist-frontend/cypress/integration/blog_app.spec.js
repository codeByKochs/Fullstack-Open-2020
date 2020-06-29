describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'testUser',
      userName: 'testUser',
      password: 'testPassword'
    }
    const secondUser = {
      name: 'secondTestUser',
      userName: 'secondTestUser',
      password: 'secondTestPassword'
    }


    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', secondUser)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('login').click()
    cy.contains('userName')
    cy.get('#userName')
    cy.contains('password')
    cy.get('#password')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#userName').type('testUser')
      cy.get('#password').type('testPassword')
      cy.get('#loginButton').click()

      cy.get('#message').should('contain', 'logged in as testUser')
      cy.get('#message').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#userName').type('testUser')
      cy.get('#password').type('wrongPassword')
      cy.get('#loginButton').click()

      cy.get('#message').should('contain', 'wrong username or password')
      cy.get('#message').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({userName: 'testUser', password: 'testPassword'})
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('http://www.testurl.com')
      cy.get('#submitButton').click()

      cy.get('#message').should('contain', 'new blog created')
      cy.get('#message').should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('testTitle testAuthor')
    })

    it('logged in user can delete his/her created blogs', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('http://www.testurl.com')
      cy.get('#submitButton').click()

      cy.get('.blog').get('.viewButton').click()
      cy.get('.deleteButton').click()

      cy.should('not.contain', 'testTitle testAuthor')
    })

    it('a blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('http://www.testurl.com')
      cy.get('#submitButton').click()

      cy.get('.blog').get('.viewButton').click()
      cy.get('.blog').get('.likeButton').click()
      cy.get('.blog').should('contain', 'likes 1')
    })

    describe('and multiple blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({
          author: 'firstBlog_author',
          title: 'firstBlog_title',
          url: 'firstBlog_url',
          votes: 0
        })
        cy.createBlog({
          author: 'secondBlog_author',
          title: 'secondBlog_title',
          url: 'secondBlog_url',
          votes: 1
        })
        cy.createBlog({
          author: 'thirdBlog_author',
          title: 'thirdBlog_title',
          url: 'thirdBlog_url',
          votes: 2
        })
      })

      it('blogs are shown orderd according to likes', function() {
        cy.get('.viewButton').then( (buttons) => {
          expect(buttons).to.have.length(3)
          for (let i=0; i<buttons.length; i++) {
            cy.wrap(buttons[i].click())
          }
        })

        cy.get('.blog').then(blogs => {
          expect(blogs).to.have.length(3)
          cy.wrap(blogs[0]).contains('likes 2')
          cy.wrap(blogs[1]).contains('likes 1')
          cy.wrap(blogs[2]).contains('likes 0')
        })
      })
    })
  })

  describe('When another user logs in', function() {
    beforeEach(function() {
      cy.login({ userName: 'testUser', password: 'testPassword' })
      cy.createBlog({
        title: 'NonDeletableBlog',
        author: 'NonDeletableBlogAuthor',
        url: 'htttp://can-not-delete-me.com'
      })
    })
    it.only('user can\'t delete blog created by another user', function() {
      cy.get('.viewButton').click()
      cy.get('.blog').contains('remove')

      cy.login({ userName: 'secondTestUser', password: 'secondTestPassword' })
      cy.get('.viewButton').click()
      cy.get('.blog').should('not.contain', 'remove')
    })
  })
})