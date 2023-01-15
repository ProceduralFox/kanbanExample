import { z } from "zod";

export const boardAddSchema = z.object({
  name: z.string(),
  columns: z.array(z.string())
})
