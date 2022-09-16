import React from 'react';
import { findByRole, render, screen } from '@testing-library/react';
import App from '../App';
import responseAPI from './mocks'

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI)
    })
    //Fazer o mock do fetch aqui 
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const cardRick = await screen.findByRole('heading', {
      name: /rick sanchez/i
    })

    expect(cardRick).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByRole('textbox')
    const botao = screen.getByRole('button', {
      name: /buscar/i
    })
    
    expect(input).toBeInTheDocument()
    expect(botao).toBeInTheDocument()
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', async () => {
    const smith = await screen.findAllByRole('heading', {
      name: /smith/i
    })

    expect(smith.length).toEqual(4)
  })

})
