import { PokeAPIRequest } from '../dtos/PokeAPIDTO'

export interface PokeAPIRepo {
  GetPokemonData: (IDPokemon: number) => Promise<PokeAPIRequest>
}
