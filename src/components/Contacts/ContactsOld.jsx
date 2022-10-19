import { Component } from 'react'
import ContactForm from 'components/ContactForm/ContactForm'
import ContactList from 'components/ContactList/ContactList'
import Filter from 'components/Filter/Filter'
import { nanoid } from 'nanoid'

export default class Contacts extends Component {

    state = {
        contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
        filter: ''
    }

    componentDidMount() {
        console.log("componentDidMount")
        const contacts = JSON.parse(localStorage.getItem("contacts"))
        if (contacts?.length) {
            console.log(contacts)
            this.setState({
                contacts
            })
        }
    } 
    
    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate")
        const { contacts } = this.state
        if (prevState.contacts !== contacts) {
            localStorage.setItem("contacts", JSON.stringify(contacts))
        }
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
        // localStorage.removeItem('contacts')
    }

    addContact = (contact) => {
        if (this.isDuplicate(contact)) {
            return alert (`${contact.name} is already in contacts.`)
        }
        this.setState((prev) => {
            const newContact = {
                id : nanoid(),
                ...contact
            }
            return {
                contacts: [...prev.contacts, newContact]
            }
        })
    }

    removeContact = (id) => {
        this.setState((prev) => {
            const newContacts = prev.contacts.filter((item) => item.id !== id)
            return {
                contacts: newContacts
            }
        } )
    }

    isDuplicate({ name, number }) {
        const { contacts } = this.state
        const res = contacts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() || item.number === number)
        return res
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    getFilteredContact() {
        const { contacts, filter } = this.state
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



    render() {
        const {addContact, handleChange, removeContact} = this
        const { filter } = this.state
        const contacts = this.getFilteredContact()
        
        return (
            <div>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={addContact} />
                
                <h2>Contacts</h2>
                <Filter filter={filter} handleChange={handleChange} />
                <ContactList items={contacts} removeContact={removeContact} />
            </div>
    )
    }
}




