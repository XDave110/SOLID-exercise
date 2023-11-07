import { FamiliesDBDTO } from './FamiliesDBDTO'
import { PokemonData } from './PokemonData'
import { ZoneDBDTO } from './ZoneDBDTO'

export type ResponseDTO = {
  baseInformation: PokemonData
  families: FamiliesDBDTO[]
  countries: ZoneDBDTO[]
}
