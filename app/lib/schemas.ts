import { z } from 'zod'

/**
 * Schema for creating a new tag
 */
export const createTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name must be less than 50 characters'),
})

export type CreateTagInput = z.infer<typeof createTagSchema>