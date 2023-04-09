import UserItem from 'components/UserItem/UserItem';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getContactsItems } from 'redux/contactsSlice';
import { getFilterValue } from 'redux/filterSlice';

function UserList () {

  const contacts = useSelector(getContactsItems);
  const filterValue = useSelector(getFilterValue);

  const getFilteredContacts = useMemo(() => () => {
    const normalizedFilter = filterValue.toLowerCase().trim();
  
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter)); 
  },
  [contacts, filterValue]);

  const filteredContacts = getFilteredContacts();
  
    return (
        <>
            <ul>
                {filteredContacts.map(item => (
                    <UserItem key={item.id} item={item}/>
                ))}
            </ul>
        </>
  );
};


export default UserList;
