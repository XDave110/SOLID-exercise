import { Router } from 'express'
import { appController } from './controller'
import { FamilyStore } from './pokemonInfo/families/FamilyStore'
import { ZoneStore } from './pokemonInfo/zones/ZoneStore'
import { PokeAPIStore } from './pokemonInfo/pokeAPI/PokeAPIStore'

const InfoRouter = Router()
const controller = new appController(new PokeAPIStore(), new FamilyStore(), new ZoneStore())

InfoRouter.get('/info/:id', async (httpRequest, httpResponse) => {
  const pokemonId = parseInt(httpRequest.params.id)
  await controller.getPokemonInfo(pokemonId, httpResponse)
})

export default InfoRouter
