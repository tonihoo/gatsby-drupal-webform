/// <reference types="Cypress" />

context('Custom components', () => {
	beforeEach(() => {
		cy.visit('/custom_components')
		cy.server()
			.route('POST', Cypress.env('ENDPOINT'))
			.as('formSubmit')
	})

	it('submit a form', () => {
		cy.get('#webform')
			.find(`[name="entity_radios"]:checked`)
			.parent()
			.contains('Foo')
			.parents('.form-group')
			.contains('Bar')
			.siblings('[type="radio"]')
			.check()

		cy.get('#webform').submit()

		// Wait for response.status to be 200
		cy.wait('@formSubmit')
			.its('status')
			.should('be', 200)

		cy.get('#webform')
			.next()
			.should('contain', 'Form submitted!')
	})
})
