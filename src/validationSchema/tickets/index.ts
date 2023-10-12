import * as yup from 'yup';

export const ticketValidationSchema = yup.object().shape({
  ticket_number: yup.number().integer().nullable(),
  is_winner: yup.boolean().nullable(),
  lottery_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
