/// <reference types="cypress" />

import Card from './card-component.vue'

describe('<Card />', () => {

  beforeEach(() => {
    cy.viewport(748, 480)
  })

  it('should return a new chat with status in attendance', () => {
    cy.fixture('card').then((data) => {

      const chat = {
        ...data,
        bgColor: 'rgb(78, 115, 223)'
      }

      cy.mount(Card, {
        props: {
          card: chat
        },
      });

      // cy.assertChat(chat)

      cy.get('[data-cy=user-name]')
        .should('be.visible')
        .should('have.text', chat.name)

      cy.get('[data-cy=status]')
        .should('be.visible')
        .should('have.text', 'EM ATENDI')
        .should('have.css', 'background-color', 'rgb(78, 115, 223)')
    })
  })

  it('should return a new chat with status open', () => {
    cy.fixture('card').then((data) => {

      const chat = {
        ...data,
        status: 'ABERTO',
        bgColor: 'rgb(231, 74, 59)'
      }
      cy.mount(Card, {
        props: {
          card: chat
        },
      });

      // cy.assertChat(chat)

      cy.get('[data-cy=user-name]')
        .should('be.visible')
        .should('have.text', chat.name)

      cy.get('[data-cy=status]')
        .should('be.visible')
        .should('have.text', chat.status)
        .should('have.css', 'background-color', 'rgb(231, 74, 59)')
    })
  })
})

// Cypress.Commands.add('assertChat', (chat: any) => {
//   cy.get('[data-cy=user-name]')
//     .should('be.visible')
//     .should('have.text', chat.name)

//   cy.get('[data-cy=status]')
//     .should('be.visible')
//     .should('have.text', chat.status === 'EM ATENDIMENTO' ? 'EM ATENDI' : chat.status)
//     .should('have.css', 'background-color', chat.bgColor)
// })