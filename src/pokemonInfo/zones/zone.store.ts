import { runQuery } from '../../db/dbcon'
import { ZoneDBDTO } from '../dtos/ZoneDBDTO'

export class ZoneStore {
  public async getPokemonZone(pokemonId: number): Promise<ZoneDBDTO[]> {
    const ZONE_QUERY = `SELECT * FROM zone WHERE id = ${pokemonId};`

    try {
      const dbResult = await runQuery(ZONE_QUERY)
      const zoneResult: ZoneDBDTO[] = dbResult.results
      return zoneResult
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
