import { FamilyZoneDBDTO } from '../dtos/FamilyZoneDBDTO'
import { ZoneDBDTO } from '../dtos/ZoneDBDTO'

export interface ZoneRepo {
  GetFamilyZones: (id_pokemon: number) => Promise<FamilyZoneDBDTO[]>
  GetZones: (zoneId: number) => Promise<ZoneDBDTO[]>
}
