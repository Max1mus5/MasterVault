import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../components_css/Dashboard.css';
import logo from '../img/LOGO.png'
import Edit from './EditItem';
import { useNavigate } from 'react-router-dom';





function Dashboard({ url }) {
    const navigate = useNavigate();
    const editUrl=url;
    const [passwords, setPasswords] = useState([]);
    const [noPasswordsMessage, setNoPasswordsMessage] = useState('');
    const [showEditItem, setShowEditItem] = useState(false); 
    const [selectedPassword, setSelectedPassword] = useState(null);


    const handleAddPasswordClick = () => {
        setShowEditItem(true); 
      };

    useEffect(() => {
        console.log('fetching passwords');
        fetchPasswords();
    }, []);

    const handleCloseEditItem = () => {
        setShowEditItem(false);
        setSelectedPassword(null);
        fetchPasswords();
      };


    const handlePasswordClick = (password) => {
        setSelectedPassword(password);
        console.log(password.id)
        setShowEditItem(true);
    };
      
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
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 500)
      }

    return (
        <div className='dashboard_container'>
            {showEditItem && <Edit url={editUrl} onClose={handleCloseEditItem} editPasswordProp={selectedPassword}  /> }
            <nav className='dashboard_navbar'>
                <div className='dashboard_logo_image'>
                    <img src={logo} alt='logo' />
                </div>
                <div className='dashboard_title'>       
                    <h1 id='dashboard_main_title'>MasterVault</h1>
                </div>
                <div className='dashboard_logout'>
                    <a onClick={handleLogout} href='/'>Logout</a>
                </div>
            </nav>
            <div className='passwords_container'>
                <div className='header_passwords'>
                    <h1 id='header_passwords_titles'>Passwords</h1>
                    <button className='add_password_button' onClick={handleAddPasswordClick }>
                        <span className="material-symbols-outlined icon_add_password">add</span>
                    </button>
                </div>
               
                {noPasswordsMessage && <h2 id='no_password_message'>{noPasswordsMessage}</h2>}
                <div className='passwords_list'>
                    <ul className='password_item'>
                        {passwords.slice(0).reverse().map((password, index) => (
                            <li className='password' key={index} onClick={()=> handlePasswordClick(password)}>   
                                <div className='url_item'>
                                    <div> <img src={`http://www.google.com/s2/favicons?domain=${password.URL}`} alt="iconURL" /></div>
                                    <div id='password_item_url' className='password_item_url'> <p>{password.URL}</p> </div>
                                </div>
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
