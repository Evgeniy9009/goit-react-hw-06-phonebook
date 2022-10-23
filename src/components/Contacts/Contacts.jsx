import ContactForm from 'components/ContactForm/ContactForm'
import ContactList from 'components/ContactList/ContactList'
import Filter from 'components/Filter/Filter'

import { useSelector, useDispatch } from 'react-redux'
import { addContact } from '../../redux/contacts/contacts-slice'
import { setFilter } from '../../redux/filter/filter-slice'
import { getFilterContacts } from '../../redux/contacts/contacts-selector'

export default function Contacts() {
    const contacts = useSelector(getFilterContacts)
    const dispatch = useDispatch()
    
    const onAddContact = (contact) => {
        if (isDuplicate(contact)) {
            return alert (`Name ${contact.name} or number ${contact.number} is already in contacts.`)
        }
        const action = addContact(contact)
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
        <Filter  handleChange={handleChange} />
        <ContactList />
    </div>
    )
}
