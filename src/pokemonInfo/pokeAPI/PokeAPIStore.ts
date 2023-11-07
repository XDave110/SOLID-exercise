import { PokeAPIRequest } from '../dtos/PokeAPIDTO'
import { PokeAPIRepo } from './PokeAPIRepo'

export class PokeAPIStore implements PokeAPIRepo {
  private response: PokeAPIRequest

  constructor() {
    this.response = {
      id: 0,
      game_indices: [{
        game_index: 0,
        version: {
          name: ''
        }
      }],
      name: '',
      weight: 0,
      height: 0,
      moves: [],
      sprites: {
        front_default: '',
        front_female: '',
        front_shiny: '',
        front_shiny_female: ''
      },
      stats: [{
        base_stat: 0,
        stat: {
          name: ''
        }
      }],
      types: [{ type: { name: '' } }]
    }
  }

  async GetPokemonData(IDPokemon: number): Promise<PokeAPIRequest> {
    const APIUrl = `https://pokeapi.co/api/v2/pokemon/${IDPokemon}`

    try {
      const APIResponse = await fetch(APIUrl)

      if (!APIResponse.ok) {
        throw new Error('Error en la solicitud a la API')
      }

      this.response = await APIResponse.json()

    } catch (error) {
      console.log((error as Error).name)
      console.log((error as Error).message)
    }

    return this.response
  }
}
