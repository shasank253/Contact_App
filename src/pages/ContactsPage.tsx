import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContactList from '../components/ContactList';

const ContactsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="page-header flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <button onClick={() => navigate('/add')} className="btn btn-primary">
          Add Contact
        </button>
      </div>
      <ContactList />
    </div>
  );
};

export default ContactsPage;
