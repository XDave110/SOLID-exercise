import { Response } from 'express'
import { PokeAPIStore } from './pokemonInfo/pokeAPI/PokeAPIStore'
import { PokeAPIService } from './pokemonInfo/pokeAPI/PokeAPIService'
import { FamilyService } from './pokemonInfo/families/FamilyService'
import { FamilyStore } from './pokemonInfo/families/FamilyStore'
import { ZoneService } from './pokemonInfo/zones/ZoneService'
import { ZoneStore } from './pokemonInfo/zones/ZoneStore'
import { ResponseDTO } from './pokemonInfo/dtos/ResponseDTO'

const gameVersion = '1'
const pokeAPIService = new PokeAPIService(new PokeAPIStore(), gameVersion)
const familyService = new FamilyService(new FamilyStore())
const zoneService = new ZoneService(new ZoneStore(), new FamilyStore())

export const getPokemonInfo = async (pokemonId: number, res: Response) => {

  try {
    const pokemonInfo = await pokeAPIService.pokemonDataRetrieve(pokemonId)
    const familyInfo = await familyService.pokemonFamilies(pokemonId)
    const zoneInfo = await zoneService.pokemonZones(pokemonId)

    const responseData: ResponseDTO = {
      countries: zoneInfo,
      families: familyInfo,
      baseInformation: pokemonInfo
    }

    res.status(200).json(responseData)
  } catch (error) {
    res.status(404).json({ error: 'Pokemon not found' })
  }
}
