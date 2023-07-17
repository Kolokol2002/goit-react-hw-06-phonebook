import {
  FormPhone,
  ButtonPhone,
  NameInput,
  ErrorValidate,
} from './Phonebook.styled';
import PropTypes from 'prop-types';
import 'yup-phone-lite';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors.';
import { addContact } from 'redux/contactsSlice';

function Phonebook() {
  const [dialCode, setDialCode] = useState('');
  const [numberValue, setNumberValue] = useState('');

  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: dialCode,
    },
  });

  const isEmpty = userData => {
    let isResetForm = true;

    const isEmptyName = contacts.filter(
      ({ name }) => name.toLowerCase() === userData.name.toLowerCase()
    ).length;

    const isEmptyNumber = contacts.filter(
      ({ number }) => number === userData.number
    ).length;

    if (!isEmptyName && !isEmptyNumber) {
      toast.success(`${userData.name}, success add!`, {
        hideProgressBar: true,
        autoClose: 2000,
        theme: 'dark',
      });

      dispatch(addContact(userData));
    }

    if (isEmptyName || isEmptyNumber) {
      toast.warn(
        `${
          (isEmptyName && userData.name) || (isEmptyNumber && userData.number)
        }, already exist in phonebook!!!`,
        {
          hideProgressBar: true,
          autoClose: 2000,
          theme: 'dark',
        }
      );
      isResetForm = false;
    }

    return isResetForm;
  };

  const onSubmit = async ({ name, number }) => {
    const isResetForm = isEmpty({
      name,
      number,
    });

    setFocus('name');

    if (isResetForm) {
      reset();
      setNumberValue(dialCode);
    }
  };

  return (
    <FormPhone onSubmit={handleSubmit(onSubmit)}>
      <NameInput>Name</NameInput>
      <input
        placeholder="Name"
        {...register('name', { required: 'Required!!!' })}
      />
      {errors.name && <ErrorValidate>{errors.name.message}</ErrorValidate>}

      <NameInput>Number</NameInput>
      <Controller
        control={control}
        name="number"
        rules={{ required: 'Required!!!' }}
        render={({ field: { name, ref } }) => {
          return (
            <PhoneInput
              inputProps={{ name, ref }}
              onChange={(value, country) => {
                setNumberValue(value);
                setValue('number', value);
                setDialCode(country.dialCode);

                if (country.dialCode !== dialCode) {
                  setNumberValue(country.dialCode);
                  setFocus('number');
                  return;
                }
              }}
              value={numberValue}
              country={'ua'}
              prefix={'+'}
              placeholder={''}
              searchPlaceholder={'Search'}
              enableSearch={true}
              disableSearchIcon={true}
            />
          );
        }}
      />

      {errors.number && <ErrorValidate>{errors.number.message}</ErrorValidate>}

      <ButtonPhone type="submit">Add Contact</ButtonPhone>
    </FormPhone>
  );
}

// Phonebook.propTypes = {
//   getContacts: PropTypes.func.isRequired,
// };

export default Phonebook;
