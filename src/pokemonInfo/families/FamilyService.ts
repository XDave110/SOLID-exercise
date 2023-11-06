import { FamilyRepo } from "./FamilyRepo";

export class FamiliService {
  constructor(private readonly repo: FamilyRepo) {}

  async pokemonFamilies(id: number) {
    const familiesResult = await this.repo.GetPokemonFamilies(id);

    const familiesMapped = familiesResult.map((family) => {
      return family.name;
    });

    return familiesMapped;
  }
}
