import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) => state.contacts.contacts.find(contact => contact.id === id));

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div>
      <h1>{contact.name}</h1>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Status: {contact.status}</p> 
    </div>
  );
};

export default ContactDetails;
