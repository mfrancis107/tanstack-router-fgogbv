import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './app/db/schema.ts',
  dialect: 'sqlite',
  out: './app/db/migrations',
  dbCredentials: {
    url: './sqlite.db',
  },
  verbose: true,
  strict: true,
})
