import { useDispatch, useSelector } from 'react-redux';
import { setFilter, selectFilterValue } from 'redux/filterSlice';
import { FrmLabel, FrmInput } from './Filter.styled';

function Filter() {

  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilterValue);

  return (
    <FrmLabel>
      Find contacts by name
      <FrmInput
        name="filter"
        type="text"
        value={filterValue}
        onChange={e => dispatch(setFilter(e.currentTarget.value))}
      />
    </FrmLabel>
  );
}

export default Filter;