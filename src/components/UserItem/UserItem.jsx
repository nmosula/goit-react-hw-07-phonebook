import { useDispatch } from 'react-redux';
import { Item, FrmButton } from './UserItem.styled';
import { deleteContact } from 'redux/operations';
import Notiflix from 'notiflix';

function UserItem({ item }) {

    const dispatch = useDispatch();

    return (
        <Item key={item.id}>
            {item.name}: {item.phone}
            <FrmButton onClick={() => {
                    dispatch(deleteContact(item.id));
                    Notiflix.Notify.info(`Контакт ${item.name} видалений з контактів`);
                }
            }
                aria-label="Delete">
                Delete
            </FrmButton>
        </Item>
    );
};

export default UserItem;