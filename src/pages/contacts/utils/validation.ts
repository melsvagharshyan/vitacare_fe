import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Մուտքագրեք անունը')
    .max(100, 'Անունը չափազանց երկար է'),
  email: z
    .email('Մուտքագրեք վավեր էլ. փոստի հասցե')
    .trim()
    .min(1, 'Մուտքագրեք էլ. փոստը'),
  subject: z
    .string()
    .trim()
    .min(1, 'Մուտքագրեք թեման')
    .max(150, 'Թեման չափազանց երկար է'),
  message: z
    .string()
    .trim()
    .min(1, 'Մուտքագրեք հաղորդագրությունը')
    .max(2000, 'Հաղորդագրությունը չափազանց երկար է'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
