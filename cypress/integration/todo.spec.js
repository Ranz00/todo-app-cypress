describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('adds a new task with category', () => {
    cy.get('#new-task').type('Finish report');
    cy.get('#category').select('Work');
    cy.get('#add-btn').click();
    cy.contains('Finish report (Work)').should('exist');
  });

  it('prevents empty tasks', () => {
    cy.get('#add-btn').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.equal('Task cannot be empty');
    });
  });

  it('persists tasks after reload', () => {
    cy.get('#new-task').type('Buy groceries');
    cy.get('#category').select('Personal');
    cy.get('#add-btn').click();
    cy.reload();
    cy.contains('Buy groceries (Personal)').should('exist');
  });

  it('deletes a task', () => {
    cy.get('#new-task').type('Temporary Task');
    cy.get('#add-btn').click();
    cy.contains('Temporary Task').parent().find('.delete-btn').click();
    cy.contains('Temporary Task').should('not.exist');
  });
});
