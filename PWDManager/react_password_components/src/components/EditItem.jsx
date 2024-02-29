import React, { useState } from 'react';
import axios from 'axios';
import '../components_css/EditItem.css';

function EditItem({ url, onClose }) {
  const [name, setName] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [passwordLength, setPasswordLength] = useState('');
  const token = sessionStorage.getItem('token');

  const closeEditItemTimeout = () => {
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleSubmit = async (event) => {


    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${url}/passwords/create`,
        {
          url: urlValue,
          title: name,
          length: parseInt(passwordLength),
          min_uppercase: 0, 
          min_lowercase: 0,
          min_numbers: 0,
          min_special_chars: 0,
        },
        config
      );
      console.log('url', `${url}/passwords/create`)
      console.log(response.data);
      onClose();
    } catch (error) {

      console.error('Error creating password:', error);
    }
  };

  return (
    <div className='edit_item_container'>
      <div className='edit_item_header'>
        <h2>Edit Password</h2>
        <button className='edit_item_close_button' onClick={closeEditItemTimeout}><span className="material-symbols-outlined">close</span></button>
      </div>

      <div className='edit_item_form_container'>
        <form className='edit_item_form' onSubmit={handleSubmit}>
          <div className='edit_item_form_input'>
            <label htmlFor='edit_item_form_input_name'>Name</label>
            <input placeholder="Item Title" type='text' id='edit_item_form_input_name' name='edit_item_form_input_name' value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className='edit_item_form_input'>
            <label htmlFor='edit_item_form_input_url'>URL</label>
            <input placeholder="www.yourURL.com" type='url' id='edit_item_form_input_url' name='edit_item_form_input_url' value={urlValue} onChange={(e) => setUrlValue(e.target.value)} required />
          </div>

          <div className='edit_item_form_input'>
            <div className='edit_item_form_input'>
              <label htmlFor='edit_item_form_input_password'>Password Length</label>
              <div className='password_input'>
                <input placeholder="Input the length of the password" type='number' id='edit_item_form_input_password' name='edit_item_form_input_password' value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className='edit_item_form_submit'>
            <input type='submit' value='Generate Password' />
            <button className='delete_item_button'><span className="material-symbols-outlined">delete</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
