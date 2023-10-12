import * as yup from 'yup';

export const businessOwnerValidationSchema = yup.object().shape({
  business_name: yup.string().nullable(),
  business_description: yup.string().nullable(),
  business_location: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
