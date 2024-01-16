import * as z from 'zod'

export const ThreadValidation = z.object({
  thread: z.string().min(1).max(500, { message: 'Maximum 500 characters' }),
  accountId: z.string(),
})