
import css from 'components/ContactList/ContactList.module.css'
import PropTypes from 'prop-types'

export default function ContactList({items , removeContact }) {
    const elements = items.map(({ name, number, id}) => {
      return (

          <li className={css.item} key={id} > {name} {number} <button className={css.btn} onClick={ () => {removeContact(id)} }>Delete</button></li>

      )
    })
  return (
      <div>
          <ul>{ elements }</ul>
    </div>
  )
}

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
    })
  ),
  removeContact: PropTypes.func.isRequired
}
