import { PokeAPIRepo } from './PokeAPIRepo'

export class PokeAPIStore implements PokeAPIRepo {
  async GetPokemonData(IDPokemon: number): Promise<string | any> {
    const APIUrl = `https://pokeapi.co/api/v2/pokemon/${IDPokemon}`

    try {
      const response = await fetch(APIUrl)

      if (!response.ok) {
        throw new Error('Error en la solicitud a la API')
      }

      return await response.json()

    } catch (error) {
      console.log((error as Error).name)
      console.log((error as Error).message)
      return []
    }
  }
}
