import * as yup from 'yup';

export const lotteryValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  draw_date: yup.date().nullable(),
  total_tickets: yup.number().integer().nullable(),
  sold_tickets: yup.number().integer().nullable(),
});
