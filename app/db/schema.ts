import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'
import { db } from './connection'
import { eq } from 'drizzle-orm'
import { createServerFn } from '@tanstack/start'

export const tableNotes = sqliteTable('notes', {
  id: integer('id').notNull().primaryKey(),
  title: text('title').notNull().default(''),
  content: text('content').notNull().default(''),
})

export type NoteInsert = typeof tableNotes.$inferInsert
export type NoteUpdate = Partial<typeof tableNotes.$inferSelect>
export type Note = typeof tableNotes.$inferSelect

export async function insertNote(note: NoteInsert) {
  console.log('insert note', note)
  return await db.insert(tableNotes).values(note).returning()
}

export async function updateNote(id: number, note: NoteUpdate) {
  return await db
    .update(tableNotes)
    .set(note)
    .where(eq(tableNotes.id, id))
    .returning()
}

export async function listNotes() {
  return await db.select().from(tableNotes)
}

export const $insert = createServerFn('POST', (note: NoteInsert) => {
  return insertNote(note)
})

export const $list = createServerFn('GET', () => {
  return listNotes()
})
