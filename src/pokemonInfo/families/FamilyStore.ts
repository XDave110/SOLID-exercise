
import { buildQueryString, runQuery } from '../../db'
import { FamiliesDBDTO } from '../dtos/FamiliesDBDTO'

import { FamilyRepo } from './FamilyRepo'

export class FamilyStore implements FamilyRepo {
  async GetPokemonFamilies(id_pokemon: number): Promise<FamiliesDBDTO[]> {
    const FAMILIES_QUERY = 'SELECT f.* FROM family f JOIN family_pokemon fp ON f.id = fp.family_id WHERE fp.pokemon_id = $id_pokemon'

    try {
      const queryBuilded = buildQueryString(FAMILIES_QUERY, { id_pokemon })
      const dbResult = await runQuery(queryBuilded)
      const familiesResult: FamiliesDBDTO[] = dbResult.results
      return familiesResult
    } catch (error) {
      console.log((error as Error).name)
      console.log((error as Error).message)
      return []
    }
  }
}
