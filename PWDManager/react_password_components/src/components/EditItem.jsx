import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components_css/EditItem.css';

function EditItem({ url, onClose, editPasswordProp }) {
  const [name, setName] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [passwordLength, setPasswordLength] = useState('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (editPasswordProp) {
      setName(editPasswordProp.title);
      setUrlValue(editPasswordProp.URL);
      setPasswordLength(editPasswordProp.length);
    }
  }, [editPasswordProp]);

  const urlPath = editPasswordProp ? `${url}/passwords/update` : `${url}/passwords/create`;

  const formData = editPasswordProp ? {
    password_id: editPasswordProp.id,
    url: urlValue,
    title: name,
    length: parseInt(passwordLength),
    min_uppercase: 0,
    min_lowercase: 0,
    min_numbers: 0,
    min_special_chars: 0
  } : {
    url: urlValue,
    title: name,
    length: parseInt(passwordLength),
    min_uppercase: 0,
    min_lowercase: 0,
    min_numbers: 0,
    min_special_chars: 0,
  };

  const handleSubmit = async (event) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;

      if (editPasswordProp) {
        response = await axios.put(
          urlPath,
          formData,
          config
        );
      } else {
        response = await axios.post(
          urlPath,
          formData,
          config
        );
      }

      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating password:', error);
    }
  };

  const handleDeletePassword = async (event) => {
    event.preventDefault();
    const deleteId = editPasswordProp.id;
    console.log('deleteId:', deleteId);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${url}/passwords/delete`,
        { data: { password_id: deleteId } },
        config
      );

      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('Error Deleting Password', error);
    }
};

  

  return (
    <div className='edit_item_container'>
      <div className='edit_item_header'>
        <h2>{editPasswordProp ? 'Edit Password' : 'New Password'}</h2>
        <button className='edit_item_close_button' onClick={onClose}><span className="material-symbols-outlined">close</span></button>
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
                <input
                  placeholder={editPasswordProp ? "Conserve password (type 0)" : "Input the length of the password"}
                  type='number'
                  id='edit_item_form_input_password'
                  name='edit_item_form_input_password'
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className='edit_item_form_submit'>
            <input type='submit' value='Generate Password' />
            {editPasswordProp && (
              <button className='delete_item_button' onClick={handleDeletePassword}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
