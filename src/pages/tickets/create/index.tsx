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

import { ticketValidationSchema } from 'validationSchema/tickets';
import { LotteryInterface } from 'interfaces/lottery';
import { UserInterface } from 'interfaces/user';
import { TicketInterface } from 'interfaces/ticket';

function TicketCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: TicketInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.ticket.create({ data: values as RoqTypes.ticket });
      resetForm();
      router.push('/tickets');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TicketInterface>({
    initialValues: {
      ticket_number: 0,
      is_winner: false,
      lottery_id: (router.query.lottery_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: ticketValidationSchema,
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
              label: 'Tickets',
              link: '/tickets',
            },
            {
              label: 'Create Ticket',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Ticket
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Ticket Number"
            formControlProps={{
              id: 'ticket_number',
              isInvalid: !!formik.errors?.ticket_number,
            }}
            name="ticket_number"
            error={formik.errors?.ticket_number}
            value={formik.values?.ticket_number}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('ticket_number', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="is_winner" display="flex" alignItems="center" mb="4" isInvalid={!!formik.errors?.is_winner}>
            <FormLabel htmlFor="switch-is_winner">Is Winner</FormLabel>
            <Switch
              id="switch-is_winner"
              name="is_winner"
              onChange={formik.handleChange}
              value={formik.values?.is_winner ? 1 : 0}
            />
            {formik.errors?.is_winner && <FormErrorMessage>{formik.errors?.is_winner}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<LotteryInterface>
            formik={formik}
            name={'lottery_id'}
            label={'Select Lottery'}
            placeholder={'Select Lottery'}
            fetcher={() => roqClient.lottery.findManyWithCount({})}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
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
              onClick={() => router.push('/tickets')}
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
    entity: 'ticket',
    operation: AccessOperationEnum.CREATE,
  }),
)(TicketCreatePage);
