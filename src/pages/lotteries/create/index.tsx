import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { lotteryValidationSchema } from 'validationSchema/lotteries';
import { LotteryInterface } from 'interfaces/lottery';

function LotteryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: LotteryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.lottery.create({ data: values as RoqTypes.lottery });
      resetForm();
      router.push('/lotteries');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LotteryInterface>({
    initialValues: {
      name: '',
      description: '',
      draw_date: new Date(new Date().toDateString()),
      total_tickets: 0,
      sold_tickets: 0,
    },
    validationSchema: lotteryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Lotteries',
              link: '/lotteries',
            },
            {
              label: 'Create Lottery',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Lottery
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="draw_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Draw Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.draw_date ? new Date(formik.values?.draw_date) : null}
              onChange={(value: Date) => formik.setFieldValue('draw_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Total Tickets"
            formControlProps={{
              id: 'total_tickets',
              isInvalid: !!formik.errors?.total_tickets,
            }}
            name="total_tickets"
            error={formik.errors?.total_tickets}
            value={formik.values?.total_tickets}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_tickets', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Sold Tickets"
            formControlProps={{
              id: 'sold_tickets',
              isInvalid: !!formik.errors?.sold_tickets,
            }}
            name="sold_tickets"
            error={formik.errors?.sold_tickets}
            value={formik.values?.sold_tickets}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('sold_tickets', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/lotteries')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'lottery',
    operation: AccessOperationEnum.CREATE,
  }),
)(LotteryCreatePage);
