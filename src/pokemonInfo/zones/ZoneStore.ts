import { buildQueryString, runQuery } from '../../db/dbcon'
import { FamilyZoneDBDTO } from '../dtos/FamilyZoneDBDTO'
import { ZoneDBDTO } from '../dtos/ZoneDBDTO'
import { ZoneRepo } from './ZoneRepo'

export class ZoneStore implements ZoneRepo {

  public async GetFamilyZones(familyId: number): Promise<FamilyZoneDBDTO[]> {
    const ZONES_QUERY = 'SELECT * FROM family_zone WHERE family_id = $familyId;'
    try {
      const queryBuilded = buildQueryString(ZONES_QUERY, { familyId })
      console.log('queryBuilded', queryBuilded)
      const dbResult = await runQuery(queryBuilded)
      const familyZoneResult: FamilyZoneDBDTO[] = dbResult.results
      return familyZoneResult
    } catch (error) {
      console.log(error)
      return []
    }
  }

  public async GetZones (zoneId: number): Promise<ZoneDBDTO[]> {
    const ZONES_QUERY = 'SELECT * FROM zone WHERE id = $zoneId;'
    try {
      const queryBuilded = buildQueryString(ZONES_QUERY, { zoneId })
      console.log('queryBuilded', queryBuilded)
      const dbResult = await runQuery(queryBuilded)
      const zoneResult: ZoneDBDTO[] = dbResult.results
      return zoneResult
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
