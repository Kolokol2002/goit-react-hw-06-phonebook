import { getContacts, getValueFilter } from 'redux/selectors.';
import {
  ContactsUserList,
  ContactsUser,
  ContactsUserName,
  ContactsButtonDelite,
} from './Contacts.styled';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContact } from 'redux/contactsSlice';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getValueFilter);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filterChange = () => {
    return contacts.filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDelete = ({ target }) => {
    const { userName } = target.dataset;
    dispatch(deleteContact(userName));
  };

  const filteredContacts = filter !== '' ? filterChange() : contacts;

  return (
    <ContactsUserList>
      {filteredContacts.map(({ name, number, id }) => (
        <ContactsUser key={id}>
          <ContactsUserName>
            {name}: {number}
          </ContactsUserName>

          <ContactsButtonDelite
            data-user-name={name}
            onClick={onDelete}
            type="button"
          >
            Delite
          </ContactsButtonDelite>
        </ContactsUser>
      ))}
    </ContactsUserList>
  );
};

// Contacts.propTypes = {
//   usersArray: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//     })
//   ),
//   onDelete: PropTypes.func.isRequired,
// };

export default Contacts;
