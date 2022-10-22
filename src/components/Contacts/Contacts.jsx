import ContactForm from 'components/ContactForm/ContactForm'
import ContactList from 'components/ContactList/ContactList'
import Filter from 'components/Filter/Filter'

import { useSelector, useDispatch } from 'react-redux'
import { addContact, removeContact } from 'components/redux/contacts/contacts-slice'
import { setFilter } from '../redux/filter/filter-slice'
import { getFilter } from 'components/redux/filter/filter-selector'
import { getFilterContacts } from 'components/redux/contacts/contacts-selector'

export default function Contacts() {
    const contacts = useSelector(getFilterContacts)
    const filter = useSelector(getFilter)
    const dispatch = useDispatch()
    
    const onAddContact = (contact) => {
        if (isDuplicate(contact)) {
            return alert (`Name ${contact.name} or number ${contact.number} is already in contacts.`)
        }
        const action = addContact(contact)
        dispatch(action)
    }

    const onRemoveContact = (id) => {
        const action = removeContact(id)
        dispatch(action)
    }

    const isDuplicate = ({ name, number }) => {
        const res = contacts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() || item.number === number)
        return res
    }

    const handleChange = (e) => {
        const {value } = e.target;
        dispatch(setFilter(value))
    }

return (
    <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={onAddContact} />
        
        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        <ContactList items={contacts} removeContact={onRemoveContact} />
    </div>
    )
}
