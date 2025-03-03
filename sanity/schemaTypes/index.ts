import { type SchemaTypeDefinition } from 'sanity'
import { player } from './player'
import { room } from './game'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [player, room],
}
