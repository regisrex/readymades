// filename : @/utils/env.ts
import { config } from 'dotenv'
import z from 'zod'
config()  // looad values in .env file into system environment variables

const envSchema = z.object({
    JWT_SECRET: z.string().min(10, "Please use a long jwt secret"),
    DATABASE_URL: z.string().url()
})

// validates and parses `process.env`and return an object or throw an error when the variables are invalid
const env = envSchema.parse({ ...process.env })
export default env