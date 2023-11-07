import { FamiliesDBDTO } from '../dtos/FamiliesDBDTO'
import { FamilyZoneDBDTO } from '../dtos/FamilyZoneDBDTO'
import { ZoneDBDTO } from '../dtos/ZoneDBDTO'
import { FamilyRepo } from '../families/FamilyRepo'
import { ZoneRepo } from './ZoneRepo'

export class ZoneService {
  constructor(private readonly zoneRepo: ZoneRepo, private readonly familyRepo: FamilyRepo) {}

  async pokemonZones(pokemonId: number) {
    const familiesResult: FamiliesDBDTO[] = await this.familyStore.GetPokemonFamilies(pokemonId)
    const familyZones: FamilyZoneDBDTO[] = await this.getFamilyZones(familiesResult)
    const filteredZones: FamilyZoneDBDTO[] = this.getTopThreeByProbability(familyZones)
    const zones: ZoneDBDTO[] = await this.getFilteredZones(filteredZones)

    return zones
  }

  private readonly getFamilyZones = async (familiesResult: FamiliesDBDTO[]): Promise<FamilyZoneDBDTO[]> => {
    let familyZones: FamilyZoneDBDTO[] = []
    for (const family of familiesResult) {
      const zonesResult = await this.zoneRepo.GetFamilyZones(family.id)
      familyZones = familyZones.concat(zonesResult)
    }
    return familyZones
  }

  private readonly getFilteredZones = async (filteredZones: FamilyZoneDBDTO[]): Promise<ZoneDBDTO[]> => {
    let zones: ZoneDBDTO[] = []
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
