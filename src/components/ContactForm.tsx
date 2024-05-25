import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { addContact, editContact } from '../store/contactsSlice';
import { v4 as uuidv4 } from 'uuid';

const ContactForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((contact) => contact.id === id)
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setStatus(contact.status as 'active' | 'inactive');
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactData = {
      id: id ? id : uuidv4(),
      name,
      email,
      phone,
      status
    };
    if (id) {
      dispatch(editContact(contactData));
    } else {
      dispatch(addContact(contactData));
    }
    navigate('/');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>{id ? 'Edit' : 'Add'} Contact</h1>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              className="radio-input"
              name="status"
              value="active"
              checked={status === 'active'}
              onChange={() => setStatus('active')}
            />
            <div className={`radio-custom ${status === 'active' ? 'active' : ''}`}></div>
            Active
          </label>
          <label className="radio-label">
            <input
              type="radio"
              className="radio-input"
              name="status"
              value="inactive"
              checked={status === 'inactive'}
              onChange={() => setStatus('inactive')}
            />
            <div className={`radio-custom ${status === 'inactive' ? 'active' : ''}`}></div>
            Inactive
          </label>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="save-button">Save</button>
        <button className="cancel-button" onClick={() => window.location.href = "/"}>Cancel</button>

      </div>
    </form>
  );
};

export default ContactForm;