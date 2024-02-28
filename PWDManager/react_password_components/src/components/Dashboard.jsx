import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../components_css/Dashboard.css';
import logo from '../img/LOGO.png'




function Dashboard({ url }) {
    const [passwords, setPasswords] = useState([]);
    const [noPasswordsMessage, setNoPasswordsMessage] = useState('');
    useEffect(() => {
        fetchPasswords();
    }, []);

    const fetchPasswords = async () => {
        try {
            const token = sessionStorage.getItem('token');

            if (!token) {
                throw new Error('No token found in sessionStorage');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`${url}/passwords/get`, config);
            const data = response.data;
            if (data.length === 0) {
                setNoPasswordsMessage('No passwords found');
            } else {
              setPasswords(data);
            }

        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    };

    return (
        <div className='dashboard_container'>
            <nav className='dashboard_navbar'>
                <div className='dashboard_logo_image'>
                    <img src={logo} alt='logo' />
                </div>
                <div className='dashboard_title'>       
                    <h1 id='dashboard_main_title'>MasterVault</h1>
                </div>
                <div className='dashboard_logout'>
                    <a href='/'>Logout</a>
                </div>
            </nav>
            <div className='passwords_container'>
                <div className='header_passwords'>
                    <h1 id='header_passwords_titles'>Passwords</h1>
                    <button className='add_password_button' onClick={() => window.location.href = '/add-password'}>
                        <span class="material-symbols-outlined icon_add_password">add</span>
                    </button>
                </div>
               
                {noPasswordsMessage && <h2 id='no_password_message'>{noPasswordsMessage}</h2>}
                <div className='passwords_list'>
                    <ul className='password_item'>
                        {passwords.map((password, index) => (
                            <li className='password' key={index}>
                                <div id='password_item_url'> {password.URL}</div>
                                <div id='password_item_title'> {password.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>  
            </div>
        </div>
    );
}

export default Dashboard;
