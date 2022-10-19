import ContactForm from 'components/ContactForm/ContactForm'
import ContactList from 'components/ContactList/ContactList'
import Filter from 'components/Filter/Filter'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'

export default function Contacts() {

    const startContact = [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]

    const [contacts, setContacts] = useState(() => {
        const value = JSON.parse(localStorage.getItem("contacts"))
        return value ?? startContact
    })
    const [filter, setFilter] = useState("")

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts])

    useEffect(() => {
        return () => {
            localStorage.removeItem("contacts")
        }
    }, [])

    const addContact = (contact) => {
        if (isDuplicate(contact)) {
            return alert (`Name ${contact.name} or number ${contact.number} is already in contacts.`)
        }
        setContacts((prev) => {
            const newContact = {
                id : nanoid(),
                ...contact
            }
            console.log(prev)
            console.log(newContact)
            return [...prev, newContact]
            
        })
    }

    const removeContact = (id) => {
        setContacts((prev) => {
            const newContacts = prev.filter((item) => item.id !== id)
            return newContacts
            
        } )
    }

    const isDuplicate = ({ name, number }) => {
        const res = contacts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() || item.number === number)
        return res
    }

    const handleChange = (e) => {
        const {value } = e.target;
        setFilter(value)
    }

    const getFilteredContact = () => {
        if (!filter) {
            return contacts
        }

        const normalezedFolter = filter.toLocaleLowerCase()
        const filteredContacts = contacts.filter(({ name, number }) => {
            const normalizedName = name.toLocaleLowerCase()
            const normalizedNumber = number.toLocaleLowerCase()
            const res = normalizedName.includes(normalezedFolter) || normalizedNumber.includes(normalezedFolter)
            return res
        })
        return filteredContacts
    }

    const contactsFiltered = getFilteredContact()

  return (
            <div>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={addContact} />
                
                <h2>Contacts</h2>
                <Filter filter={filter} handleChange={handleChange} />
                <ContactList items={contactsFiltered} removeContact={removeContact} />
            </div>
    )
}
