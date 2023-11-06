import { ZoneDBDTO } from '../dtos/ZoneDBDTO'

export interface ZoneRepo {
  GetPokemonZones: (id_pokemon: number) => Promise<ZoneDBDTO[]>
}
