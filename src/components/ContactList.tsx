import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { deleteContact } from '../store/contactsSlice';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="contact-list-container">
      <h1>Contact List</h1>
      {contacts.map(contact => (
        <div key={contact.id} className="contact-item">
          <div className="contact-info">
            <p>Name: {contact.name}</p>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Status: {contact.status}</p> 
          </div>
          <div className="contact-actions">
            <Link to={`/details/${contact.id}`} className="view-button">View</Link>
            <Link to={`/edit/${contact.id}`} className="edit-button">Edit</Link>
            <button onClick={() => handleDelete(contact.id)} className="delete-button">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;

