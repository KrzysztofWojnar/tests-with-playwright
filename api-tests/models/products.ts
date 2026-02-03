import * as z from 'zod';

export const Product = z.object({
  id: z.int(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  brand: z.optional(z.string()),
});

export const Products = z.object({
  products: z.array(Product),
  total: z.int(),
  skip: z.int(),
  limit: z.int(),
});
