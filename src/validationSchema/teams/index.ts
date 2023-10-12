import * as yup from 'yup';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  team_lead: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
