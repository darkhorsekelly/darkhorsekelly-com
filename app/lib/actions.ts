'use server'

import { createTagSchema, type CreateTagInput } from './schemas'
import prisma from './prisma'

/**
 * Creates a new tag in the database
 * @param data - The tag data to create
 * @returns Promise containing the created tag or an error message
 */
export async function createTag(data: CreateTagInput) {
  try {
    // Validate input data
    const validatedData = createTagSchema.parse(data)
    
    // Check if tag already exists
    const existingTag = await prisma.tag.findUnique({
      where: { name: validatedData.name }
    })
    
    if (existingTag) {
      return { message: 'Tag with this name already exists.' }
    }
    
    // Create the tag
    const tag = await prisma.tag.create({
      data: {
        name: validatedData.name,
      }
    })
    
    return { tag }
  } catch (error) {
    console.error('Database Error: Failed to create tag.', error)
    return { message: 'Database Error: Failed to create tag.' }
  }
}