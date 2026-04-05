import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'contactPage.validation.nameRequired')
    .max(100, 'contactPage.validation.nameTooLong'),
  email: z
    .email('contactPage.validation.emailInvalid')
    .trim()
    .min(1, 'contactPage.validation.emailRequired'),
  subject: z
    .string()
    .trim()
    .min(1, 'contactPage.validation.subjectRequired')
    .max(150, 'contactPage.validation.subjectTooLong'),
  message: z
    .string()
    .trim()
    .min(1, 'contactPage.validation.messageRequired')
    .max(2000, 'contactPage.validation.messageTooLong'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
