import { useState } from 'react'
import { nanoid } from 'nanoid'
import css from 'components/ContactForm/ContactForm.module.css'
import { addContact } from '../../redux/contacts/contacts-slice'
import { useDispatch, useSelector } from 'react-redux'
import { getFilterContacts } from 'redux/contacts/contacts-selector'

export default function ContactForm() {

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const idName = nanoid()
    const idNumber = nanoid()

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
        const { name, value } = e.target;
        switch (name) {
            case "name": 
                return setName(value)
            case "number":
                return setNumber(value)
            default: 
                return
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const contact= {name, number}
        onAddContact(contact)
        console.log(contact)
        setName('')
        setNumber('')

    }

    return (
            <form onSubmit={handleSubmit} className={css.form}>
                <label htmlFor={idName}>Name</label>
                    <input
                        id={idName}
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                <label htmlFor={idNumber}>Number</label>
                    <input
                        id={idNumber}
                        type="tel"
                        name="number"
                        value={number}
                        onChange={handleChange}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                <button type='submit'>Add contact</button>
            </form >
        )
}
