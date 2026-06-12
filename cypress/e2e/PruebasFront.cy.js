describe('Pruebas Frontend - Web IMDb', () => {

  it('1. Perfil de Nicolas Cage', () => {
   cy.visit('https://imdb.com')
   cy.wait(2000)
   cy.get('input#suggestion-search, input[data-testid="suggestion-search"]').should('be.visible').type('Nicolas Cage')
   cy.get('.react-autosuggest__suggestions-list', { timeout: 6000 }).should('be.visible')
   cy.get('[data-testid="search-result--const"]').first().click({ force: true })
   cy.scrollTo('center')
   cy.wait(3000)
   cy.get('[data-testid="accordion-item-amzn1.imdb.concept.name_credit_category.a9ab2a8b-9153-4edb-a27a-7c2346830d77-Upcoming"] > .ipc-accordion__item__title > .ipc-inline-list > :nth-child(1)').click({ force: true })
   cy.get('[data-testid="unrel_cred_amzn1.imdb.concept.name_credit_category.a9ab2a8b-9153-4edb-a27a-7c2346830d77_4"] .ipc-metadata-list-summary-item__t').first().click({ force: true })
  })

  it('2. Calificacion de la segunda pelicula de las mas populares', () => {
    cy.visit('https://imdb.com')
    cy.get('#imdbHeader-navDrawerOpen', { timeout: 10000 }).should('be.visible').click()
    cy.get('.sc-e0036dce-0 > :nth-child(1) > .navlinkcat__targetWrapper > [data-testid="category-expando"] > .navlinkcat__itemTitle').should('be.visible').click()
    cy.get('[href="/es/chart/moviemeter/?ref_=hm_nv_menu"]').should('be.visible').click()
    cy.get('.ipc-metadata-list-summary-item__c > .ipc-metadata-list-summary-item__tc > .sc-fc35a1ef-1 > .sc-fc35a1ef-0 > .sc-ebbca8d2-0 > .flex > .ipc-inline-list > .ipc-title > .ipc-title-link-wrapper > .ipc-title__text').should('be.visible').eq(1).click()
    cy.wait(1000)
    cy.get('[data-testid="hero-rating-bar__user-rating__unrated"]').first().click({ force: true })
    cy.wait(1000)
    cy.get('button[aria-label="Calificar 5"]').click({ force: true })
    cy.get('button.ipc-rating-prompt__rate-button').contains('Calificar').click({ force: true })
  })

  it('3. Galería de fotos en series de tv', () => {
    cy.visit('https://imdb.com')
    cy.get('#imdbHeader-navDrawerOpen', { timeout: 10000 }).should('be.visible').click()
    cy.get('[data-testid="grouped-link-category"] > :nth-child(1) > .navlinkcat__targetWrapper > [data-testid="category-expando"] > .navlinkcat__itemTitle').should('be.visible').click()
    cy.get('a[href*="/chart/toptv/"]').first().click({ force: true })
    cy.wait(4000)
    cy.get('a[href*="tt0903747"]').first().scrollIntoView({ duration: 500 }).click({ force: true })
    cy.get('[data-testid="hero__photo-link"]').should('be.visible').click()
    cy.contains('div', '99+ fotos').click({ force: true })
    cy.wait(4000)
    /* al editar etiquetas para acceder al filtro de danny trejo , la pagina deriva a crear cuenta o iniciar sesion inpidiendo continuar el flujo. */
    cy.get('a[aria-label="Editar etiquetas"]').should('be.visible').click({ force: true })
  })

  it('4. Celebridades nacidas ayer', () => {
    cy.visit('https://imdb.com')
    cy.get('#imdbHeader-navDrawerOpen', { timeout: 10000 }).should('be.visible').click()
    cy.get(':nth-child(4) > .navlinkcat__targetWrapper > [data-testid="category-expando"] > .navlinkcat__itemTitle').should('be.visible').click()
    cy.get('[href="/es/feature/bornondate/?ref_=hm_nv_menu"] > .ipc-list-item__text').should('be.visible').click()
    cy.contains('Cumpleaños: ').should('be.visible').click()
    cy.get('[data-testid="accordion-item-birthdayAccordion"] > .ipc-accordion__item__title > .sc-bf21fba3-0').should('be.visible').click()
    const dayjs = require('dayjs')
    const mesDiaDeAyer = dayjs().subtract(1, 'day').format('MM-DD')
    cy.get('[data-testid="birthday-input-test-id"]').should('be.visible').type(mesDiaDeAyer).type('{enter}')
    cy.wait(2000)
    cy.get('[data-testid="adv-search-get-results"] > .ipc-btn__text').should('be.visible').click()

    cy.get('[data-testid="nlib-title"]').eq(2).scrollIntoView({ duration: 500 })
    cy.wait(800)
    cy.get('[data-testid="nlib-title"] a').eq(2).click({ force: true, scrollBehavior: false })
    cy.screenshot('evidencia click tercer-elemento', { capture: 'viewport' })
  })

  it('5. Celebridades nacidas hoy hace cuarenta anios', () => {
    cy.visit('https://imdb.com')
    cy.get('#imdbHeader-navDrawerOpen', { timeout: 10000 }).should('be.visible').click()
    cy.get(':nth-child(4) > .navlinkcat__targetWrapper > [data-testid="category-expando"] > .navlinkcat__itemTitle').should('be.visible').click()
    cy.get('[href="/es/feature/bornondate/?ref_=hm_nv_menu"] > .ipc-list-item__text').should('be.visible').click()  
    cy.wait(5000)
    cy.contains('Cumpleaños: ').should('be.visible').click()
    cy.wait(3000)
    cy.contains('Fecha de nacimiento').should('be.visible').click()
    cy.scrollTo(0, -600)
    const dayjs = require('dayjs')
    const fechaDesde = dayjs().subtract(40, 'year').format('YYYY-MM-DD')
    cy.get('[data-testid="birthDate-start"]').should('be.visible').clear().type(fechaDesde)
    cy.wait(500)
    cy.get('[data-testid="birthDate-end"]').should('be.visible').clear().type(fechaDesde)
    cy.scrollTo(0, -600)
    cy.contains('Ver resultados').should('be.visible').click()
    cy.wait(2000)
    cy.scrollTo('top')
    cy.wait(2000) 

    cy.get('body').then(($body) => {
    if ($body.find(':contains("1. ")').length > 0) {
    cy.log('El elemento "1. " existe. Ejecutando click...')
    cy.contains('1. ').scrollIntoView().click({ force: true, scrollBehavior: false })
    } else {
    cy.log('El elemento "1. " no está presente en esta pantalla. Saltando paso.')
    }

    cy.wait(800)
    cy.screenshot('evidencia captura', { capture: 'viewport' })
    })
  })
})
