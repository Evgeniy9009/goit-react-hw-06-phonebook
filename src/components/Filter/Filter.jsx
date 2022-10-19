import css from 'components/Filter/Filter.module.css'
import PropTypes from 'prop-types'

export default function Filter({filter, handleChange}) {
    return (
        <div className={css.filter}>
            <label htmlFor="filter"> Find contacts by name</label>
            <input className={css.input} id= "filter" type="text" name='filter' onChange={handleChange} value={filter} />
        </div>
  )
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

