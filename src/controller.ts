import { Response } from 'express'
import { PokeAPIService } from './pokemonInfo/pokeAPI/PokeAPIService'
import { FamilyService } from './pokemonInfo/families/FamilyService'
import { ZoneService } from './pokemonInfo/zones/ZoneService'
import { ResponseDTO } from './pokemonInfo/dtos/ResponseDTO'

export class appController {
  private readonly pokeAPIService: PokeAPIService
  private readonly familyService: FamilyService
  private readonly zoneService: ZoneService
  private readonly versionGame: string

  constructor(pokeApiStore: any, familyStore: any, zoneStore: any) {
    this.versionGame = '1'
    this.pokeAPIService = new PokeAPIService(pokeApiStore, this.versionGame)
    this.familyService = new FamilyService(familyStore)
    this.zoneService = new ZoneService(zoneStore, familyStore)
  }

  public async getPokemonInfo(pokemonId: number, httpResponse: Response) {
    try {
      const pokemonInfo = await this.pokeAPIService.pokemonDataRetrieve(pokemonId)
      const familyInfo = await this.familyService.pokemonFamilies(pokemonId)
      const zoneInfo = await this.zoneService.pokemonZones(pokemonId)

      const res: ResponseDTO = {
        countries: zoneInfo,
        families: familyInfo,
        baseInformation: pokemonInfo
      }

      httpResponse.send(res)
    } catch (error) {
      console.error(error)
      httpResponse.status(500).json({ error: 'Internal Server Error' })
    }

  }
}

