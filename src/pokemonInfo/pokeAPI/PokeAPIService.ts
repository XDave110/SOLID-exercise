import { PokemonData, Sprites, Move, PokemonStats } from '../dtos/PokemonData'
import { PokeAPIRepo } from './PokeAPIRepo'

export class PokeAPIService {
  constructor(private readonly repo: PokeAPIRepo, private readonly gameVersion: string) {}

  async pokemonDataRetrieve(id: number) {
    const pokeDataResult = await this.repo.GetPokemonData(id)

    const pokeData = await this.pokemonDataMapping(pokeDataResult)
    console.log(pokeData)
  }

  async pokemonDataMapping(responseData: any): Promise<PokemonData> {

    const pokemonIndex = await this.pokemonIndexMapping(responseData.game_indices, this.gameVersion)
    // const pokemonMoves: any[] = await this.pokemonMoveMapping(responseData.moves)
    const pokemonSprites = await this.pokemonSpriteMapping(responseData.sprites)
    const pokemonStats = await this.pokemonStatMapping(responseData.stats)
    const pokemonTypes = await this.pokemonTypeMapping(responseData.types)

    const pokemonData: PokemonData = {
      id: responseData.id,
      pokedexNumber: pokemonIndex,
      name: responseData.name,
      weight: responseData.weight,
      height: responseData.height,
      moves: responseData.moves,
      sprites: pokemonSprites,
      stats: pokemonStats,
      types: pokemonTypes
    }

    return pokemonData
  }

  async pokemonIndexMapping(responseIndexes: any, gameVersion: string): Promise<any> {
    for (const index of responseIndexes) {
      if (index.version.name === gameVersion) {
        const desirableIndex = index.game_index

        return desirableIndex
      }
    }

    return undefined
  }

  /*
  async pokemonMoveMapping(responseMoves: any): Promise<any> {
    const movesMapped = responseMoves.map((move: Move) => {
      const moves: Move = {
        name: responseMoves.front_default,
        level: responseMoves.front_female
      }
      return moves
    })
    return movesMapped
  }
*/
  async pokemonSpriteMapping(responseSprites: any): Promise<Sprites> {
    const sprites: Sprites = {
      normal: responseSprites.front_default,
      female: responseSprites.front_female,
      shiny: responseSprites.front_shiny,
      femaleShiny: responseSprites.front_shiny_female
    }

    return sprites
  }

  async pokemonStatMapping(responseStats: any): Promise<any> {
    const pokemonStats: PokemonStats = {
      hp: { base: 0, maxEvs: 0 },
      attack: { base: 0, maxEvs: 0 },
      defense: { base: 0, maxEvs: 0 },
      specialAttack: { base: 0, maxEvs: 0 },
      specialDefense: { base: 0, maxEvs: 0 },
      speed: { base: 0, maxEvs: 0 }
    }

    for (const individualStat of responseStats) {
      switch (individualStat.stat.name) {
        case 'hp':
          pokemonStats.hp.base = individualStat.base_stat
          break
        case 'attack':
          pokemonStats.attack.base = individualStat.base_stat
          break
        case 'defense':
          pokemonStats.defense.base = individualStat.base_stat
          break
        case 'special-attack':
          pokemonStats.specialAttack.base = individualStat.base_stat
          break
        case 'special-defense':
          pokemonStats.specialDefense.base = individualStat.base_stat
          break
        case 'speed':
          pokemonStats.speed.base = individualStat.base_stat
          break
      }
    }

    return pokemonStats
  }

  async pokemonTypeMapping(responseTypes: any): Promise<any[]> {
    const pokemonTypes = []
    for (const individualType of responseTypes) {
      pokemonTypes.push(individualType.type)
    }

    return pokemonTypes
  }


}
