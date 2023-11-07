import { FamilyZoneDBDTO } from '../dtos/FamilyZoneDBDTO'
import { ZoneDBDTO } from '../dtos/ZoneDBDTO'
import { FamilyRepo } from '../families/FamilyRepo'
import { ZoneRepo } from './ZoneRepo'

export class ZoneService {
  constructor(private readonly zoneRepo: ZoneRepo, private readonly familyRepo: FamilyRepo) {}

  async pokemonZones(pokemonId: number) {
    let zones: ZoneDBDTO[] = []
    let familyZones: FamilyZoneDBDTO[] = []

    const familiesResult = await this.familyRepo.GetPokemonFamilies(pokemonId)

    for (const family of familiesResult) {
      const zonesResult = await this.zoneRepo.GetFamilyZones(family.id)
      familyZones = familyZones.concat(zonesResult)
    }

    const filteredZones: FamilyZoneDBDTO[] = this.getTopThreeByProbability(familyZones)

    for (const filteredZone of filteredZones) {
      const zone = await this.zoneRepo.GetZones(filteredZone.zone_id)
      zones = zones.concat(zone)
    }

    return zones
  }

  private readonly getTopThreeByProbability = (data: FamilyZoneDBDTO[]): FamilyZoneDBDTO[] => {
    const sortedData = [...data].sort((a, b) => b.probability - a.probability)
    return sortedData.slice(0, 3)
  }
}
