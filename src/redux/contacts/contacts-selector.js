
export const getContacts = store => store.contacts;
export const getFilterContacts = ({ filter, contacts }) => {
    if (!filter) {
        return contacts
    }

    const normalezedFilter = filter.toLocaleLowerCase()
    const filteredContacts = contacts.filter(({ name, number }) => {
        const normalizedName = name.toLocaleLowerCase()
        const normalizedNumber = number.toLocaleLowerCase()
        const res = normalizedName.includes(normalezedFilter) || normalizedNumber.includes(normalezedFilter)
        return res
    })
    return filteredContacts
}
