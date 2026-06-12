describe('Pruebas de API - endpoints POKEAPI', () => {

  const URL_BASE_BERRY = 'https://pokeapi.co'

  it('1.1 Obtener HttpStatus 200 con un id de berry valido', () => {
    cy.request({
      method: 'GET',
      url: `${URL_BASE_BERRY}/api/v2/berry/1/`, 
    }).then((respuesta) => {
      expect(respuesta.status).to.eq(200)
      expect(respuesta.body).to.have.property('id', 1)
      expect(respuesta.body).to.have.property('name', 'cheri')
      expect(respuesta.body).to.have.property('size')
      expect(respuesta.body).to.have.property('smoothness')
    })
  })

  it('1.2 Obtener HttpStatus 404 al llamar id de berry no valido', () => {
    cy.request({
      method: 'GET',
      url: `${URL_BASE_BERRY}/api/v2/berry/999999/`,
      failOnStatusCode: false
    }).then((respuesta) => {
      expect(respuesta.status).to.eq(404)
    })
  })

  it('1.3 Obtener HttpStatus 200 con un nombre de berry valido', () => {
    cy.request({
      method: 'GET',
      url: `${URL_BASE_BERRY}/api/v2/berry/cheri/`,
    }).then((respuesta) => {
      expect(respuesta.status).to.eq(200)
      expect(respuesta.body.name).to.eq('cheri')
      expect(respuesta.body).to.have.property('growth_time')
      expect(respuesta.body).to.have.property('max_harvest')
    })
  })

  it('1.4 Obtener HttpStatus 404 con un nombre de berry invalido', () => {
    cy.request({
      method: 'GET',
      url: `${URL_BASE_BERRY}/bayaInexistente/`,
      failOnStatusCode: false 
    }).then((respuesta) => {
      expect(respuesta.status).to.eq(404)
    })
  })

  it('2. Caso de Prueba Avanzado de Sabores y Potencia (/berry-flavor)', () => {
  const saborBuscado = 'spicy';
  cy.request('GET', `${URL_BASE_BERRY}/api/v2/berry-flavor/${saborBuscado}`)
    .then((respuestaFlavor) => {
      expect(respuestaFlavor.status).to.eq(200);
      expect(respuestaFlavor.body.name).to.eq(saborBuscado);
      const todasLasBayas = respuestaFlavor.body.berries;
      cy.log(`Total de bayas con sabor ${saborBuscado}: ${todasLasBayas.length}`);
      const arrayOrdenado = todasLasBayas.sort((a, b) => b.potency - a.potency);
      const bayaMayorPotencia = arrayOrdenado[0];
      const nombreBayaGanadora = bayaMayorPotencia.berry.name;
      const potenciaMaxima = bayaMayorPotencia.potency;
      cy.log(`Baya mas picante: ${nombreBayaGanadora} (Potencia: ${potenciaMaxima})`);
      expect(nombreBayaGanadora).to.be.a('string');
      expect(potenciaMaxima).to.be.greaterThan(0);
      cy.request('GET', `${URL_BASE_BERRY}/api/v2/berry/${nombreBayaGanadora}`)
        .then((respuestaBerry) => {
          expect(respuestaBerry.status).to.eq(200);
          expect(respuestaBerry.body.name).to.eq(nombreBayaGanadora);
          expect(respuestaBerry.body).to.have.property('id');
          expect(respuestaBerry.body).to.have.property('growth_time');
          expect(respuestaBerry.body).to.have.property('flavors');
          const saborValidado = respuestaBerry.body.flavors.find(f => f.flavor.name === saborBuscado);
          expect(saborValidado).to.exist;
          expect(saborValidado.potency).to.eq(potenciaMaxima);
          console.log('Datos finales de la Baya Ganadora:', respuestaBerry.body);
        });
    });
 });

})
