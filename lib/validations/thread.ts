import * as z from 'zod'

export const ThreadValidation = z.object({
  thread: z.string().min(1).max(200, { message: 'Maximum 250 characters' }),
  accountId: z.string(),
})

export const ReplyValidation = z.object({
  thread: z.string().min(1).max(200, { message: 'Maximum 250 characters' }),
})