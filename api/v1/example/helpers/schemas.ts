import { z } from 'zod';

export const validateLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export const validateSegurosSchema = z.object({
  edad: z.number().int().min(1),
  sumaAsegurada: z.number(),
  sexo:z.enum(['F','M','m','f']),
  fuma:z.enum(['S','s','N','n'])
});