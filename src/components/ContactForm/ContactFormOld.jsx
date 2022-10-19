import { Component } from 'react'

import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import css from 'components/ContactForm/ContactForm.module.css'

export default class ContactForm extends Component  {

    state = {
        name: '',
        number: ''
    }

    idName = nanoid()
    idNumber = nanoid()

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({ ...this.state })
                console.log(this.props)
        this.setState({
            name: '',
            number: ''
        })
    }
    
    render() {
        const { name, number}= this.state
        const { idName, idNumber, handleSubmit, handleChange } = this
        
        return(
            <form onSubmit={handleSubmit} className={css.form}>
                <label htmlFor={idName}>Name </label>
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
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
