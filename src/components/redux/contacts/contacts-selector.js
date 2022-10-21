export const getContacts = store => store.contacts;
export const getFilterContacts = ({ filter, contacts }) => {
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
