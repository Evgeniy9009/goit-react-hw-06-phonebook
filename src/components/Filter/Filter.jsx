import css from 'components/Filter/Filter.module.css'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getFilter } from '../../redux/filter/filter-selector'


export default function Filter({  handleChange }) {
    const filter = useSelector(getFilter)

    return (
        <div className={css.filter}>
            <label htmlFor="filter"> Find contacts by name</label>
            <input className={css.input} id= "filter" type="text" name='filter' onChange={handleChange} value={filter} />
        </div>
  )
}

Filter.propTypes = {
    filter: PropTypes.string,
    handleChange: PropTypes.func.isRequired
}

