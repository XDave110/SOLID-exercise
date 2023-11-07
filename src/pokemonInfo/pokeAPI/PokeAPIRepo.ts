import { PokemonData } from '../dtos/PokemonData'

export interface PokeAPIRepo {
  GetPokemonData: (IDPokemon: number) => Promise<PokemonData>
}
