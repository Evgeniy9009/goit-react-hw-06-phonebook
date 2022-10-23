import css from 'components/Filter/Filter.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from 'redux/filter/filter-slice'
import { getFilter } from '../../redux/filter/filter-selector'


export default function Filter() {
    const filter = useSelector(getFilter)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { value } = e.target;
        dispatch(setFilter(value))
    }

    return (
        <div className={css.filter}>
            <label htmlFor="filter"> Find contacts by name</label>
            <input className={css.input} id= "filter" type="text" name='filter' onChange={handleChange} value={filter} />
        </div>
    )
}



