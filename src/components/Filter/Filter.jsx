import { ContainerFilter, TitleFilter, InputFilter } from './Filter.styled';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setValueFilter } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = ({ target: { value } }) => {
    dispatch(setValueFilter(value));
  };

  return (
    <ContainerFilter>
      <TitleFilter>Find number</TitleFilter>
      <InputFilter type="text" name="filter" onChange={handleFilter} />
    </ContainerFilter>
  );
};

// Filter.propTypes = {
//   handleFilter: PropTypes.func.isRequired,
// };

export default Filter;
