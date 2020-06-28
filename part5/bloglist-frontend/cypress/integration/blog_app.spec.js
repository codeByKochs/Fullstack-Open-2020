describe('Blog app', function() {
  it('front page can be opend', function() {
    cy.visit('http://localhost:3000')
    cy.contains('new blog')
  })
})