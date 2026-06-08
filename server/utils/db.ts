// server/utils/db.ts
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' });

import * as schema from '#server/db/schema'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })

export { schema }