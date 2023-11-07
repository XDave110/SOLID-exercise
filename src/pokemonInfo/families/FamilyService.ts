import { FamilyRepo } from './FamilyRepo'

export class FamilyService {
  constructor(private readonly repo: FamilyRepo) {}

  async pokemonFamilies(id: number) {
    const familiesResult = await this.repo.GetPokemonFamilies(id)

    return familiesResult
  }
}
