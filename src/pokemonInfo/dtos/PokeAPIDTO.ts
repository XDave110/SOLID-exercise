export type PokeAPIRequest = {
  id: number
  game_indices: [{
    game_index: number
    version: {
      name: string
    } }]
  name: string
  weight: number
  height: number
  moves: any[]
  sprites: { front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
  }
  stats: [{
    base_stat: number
    stat: {
      name: string
    } }]
  types: [{ type: { name: string } }]
}
