import { z } from 'zod';

export const BookSearchValidation = z.object({
  bookId: z.coerce.string(),
});
