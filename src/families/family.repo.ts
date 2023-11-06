import { FamiliesDBDTO } from "../pokemonInfo/dtos/FamiliesDBDTO";

export interface FamilyRepo {
  GetPokemonFamilies(id_pokemon: number): Promise<FamiliesDBDTO[]>;
}
