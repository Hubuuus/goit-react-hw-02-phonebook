import { PropTypes } from "prop-types";
import { Component } from "react";
import css from "./ContactForm.module.css";

export class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  render() {
    const { addContact, handleChange } = this.props;
    return (
      <form className={css.Form} onSubmit={addContact}>
        <h3 className={css.Form_h3}>Name</h3>
        <input
          className={css.Form_input}
          onChange={handleChange}
          type='text'
          name='name'
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="e.g. John Smith"
        />
        <h3 className={css.Form_h3}>Number</h3>
        <input
          className={css.Form_input}
          onChange={handleChange}
          type='tel'
          name='number'
          pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
          title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
          required
          placeholder="e.g. 488-88-88"
        />
        <button className={css.Form_button} type='submit'>Add contakt</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func,
  handleChange: PropTypes.func,
};
