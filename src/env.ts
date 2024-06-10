import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().url(),
  SESSION_SECRET: z.string(),
  EMAILJS_SERVICE_ID: z.string(),
  EMAILJS_TEMPLATE_ID: z. string(),
  EMAILJS_PUBLIC_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables.')
}

export const env = parsedEnv.data