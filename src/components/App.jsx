import { Component } from "react";
import { nanoid } from "nanoid";
import { PropTypes } from "prop-types";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

import css from "./App.module.css";

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  handleChange = evt => {
    //przypisuje dane odpowiednio do state.contacts
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  addContact = evt => {
    evt.preventDefault();
    const { name, number, contacts } = this.state;

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    //sprawdzanie i przypisanie contact do state contacts
    {
      this.searchContacts(contacts, name) == 0
        ? this.setState(prevState => ({
            contacts: [...prevState.contacts, contact],
          }))
        : alert(`${name} is already in contacts`);
    }

    //reset fomularza
    const form = evt.currentTarget;
    form.reset();
  };

  deleteContact =  (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
  }));
  };

  searchChange = evt => {
    return this.setState({ filter: evt.target.value });
  };

  searchContacts = (arr, el) => {
    //dzięki temu podczas wyszukiwania nie martwimy się o duże litery
    const normalizedCase = el.toLowerCase();

    //wuszukanie z contacts
    return arr.filter(contact => contact.name.toLowerCase().includes(normalizedCase));
  };

  render() {
    const { filter, contacts } = this.state;
    const filtered = this.searchContacts(contacts, filter);
    return (
      <div className={css.App}>
        <h1 className={css.App_h1}>Phonebook</h1>
        <ContactForm addContact={this.addContact} handleChange={this.handleChange} />
        <h2 className={css.App_h2}>Contact</h2>
        <Filter searchChange={this.searchChange} />
        <ContactList contacts={contacts} filtered={filtered} deleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  searchContacts: PropTypes.func,
};
