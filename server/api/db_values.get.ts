// server/api/db_values.get.ts
import { db, schema } from '#server/utils/db'

export default defineEventHandler(async () => {
  const [lobby] = await Promise.all([
    db.select().from(schema.lobby),
  ])

  return {
    lobby,
  }
})