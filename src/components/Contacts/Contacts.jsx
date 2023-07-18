import { getContacts, getValueFilter } from 'redux/selectors.';
import {
  ContactsUserList,
  ContactsUser,
  ContactsUserName,
  ContactsButtonDelite,
} from './Contacts.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getValueFilter);

  const filterChange = () => {
    console.log(contacts);
    return contacts.filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.includes(filter)
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
