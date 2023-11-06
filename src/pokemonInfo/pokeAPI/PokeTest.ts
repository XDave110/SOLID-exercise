import { PokeAPIService } from './PokeAPIService'
import { PokeAPIStore } from './PokeAPIStore'
async function main() {
  try {
    const id = 1 // Reemplaza con el ID del Pokémon que deseas consultar
    const api = new PokeAPIService(new PokeAPIStore(), 'red')
    await api.pokemonDataRetrieve(id)
  } catch (error) {
    console.error('Error:', error)
  }
}

void main()
/*
PokeAPIService = new PokeAPIService(new PokeAPIStore())

await PokeAPIService.pokemonDataRetrieve('1')
*/
