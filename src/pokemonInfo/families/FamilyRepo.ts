import { FamiliesDBDTO } from "../dtos/FamiliesDBDTO";

export interface FamilyRepo {
  GetPokemonFamilies(id_pokemon: number): Promise<FamiliesDBDTO[]>;
}
