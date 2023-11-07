import { Router } from 'express'
import { getPokemonInfo } from './controller'

const InfoRouter = Router()

InfoRouter.get('/info/:id', async (httpRequest, httpResponse) => {
  const pokemonId = parseInt(httpRequest.params.id)
  await getPokemonInfo(pokemonId, httpResponse)
})

export default InfoRouter
