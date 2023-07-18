import Phonebook from '../Form';
import Contacts from '../Contacts';
import Title from '../Title';
import Filter from '../Filter';
import { MainContainer } from './App.styled';
import { getContacts } from 'redux/selectors.';
import { useSelector } from 'react-redux';

function App() {
  const contacts = useSelector(getContacts);
  return (
    <MainContainer>
      <Title title={'Phonebook'}>
        <Phonebook getContacts={getContacts} />
      </Title>

      {contacts.length !== 0 && (
        <Title title={'Contacts'}>
          <Filter />
          <Contacts />
        </Title>
      )}
    </MainContainer>
  );
}

export default App;
