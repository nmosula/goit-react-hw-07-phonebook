import UserItem from 'components/UserItem/UserItem';
import { useSelector } from 'react-redux';
import { selectContactsItems } from 'redux/contactsSlice';
import { selectFilterValue } from 'redux/filterSlice';

function UserList () {

  const contacts = useSelector(selectContactsItems);
  const filterValue = useSelector(selectFilterValue);
 
  const getFilteredContacts = (contacts, filterValue) => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  const filteredContacts = getFilteredContacts(contacts, filterValue);
  
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
