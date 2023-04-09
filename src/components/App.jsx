import { useSelector } from 'react-redux';
import UserForm from './UserForm';
import UserList from './UserList';
import Layout from './Layout';
import Filter from './Filter';
import { getContactsItems } from 'redux/contactsSlice';

export const App = () => {

  const contacts = useSelector(getContactsItems);

  return (
    <Layout>
      <UserForm />
      <h2>Contacts</h2>
      {contacts.length !== 0 ? (
        <>
          <Filter />
          <UserList />
        </>
        ) : ( <h3>There are no contacts in your phonebook!</h3> )
      }
    </Layout>
  );
}

export default App;