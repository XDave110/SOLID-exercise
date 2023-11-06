import { ZoneRepo } from './zone.repo'

export class ZoneService {
  constructor(private readonly repo: ZoneRepo) {}

  async pokemonZones(id: number) {
    const zonesResult = await this.repo.GetPokemonZones(id)

    const zonesMapped = zonesResult.map((zone) => {
      return zone.id
    })

    return zonesMapped
  }
}
