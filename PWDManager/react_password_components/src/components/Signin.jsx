import React,{useState, useEffect} from 'react';//react hooks, useState and useEffect for state and lifecycle
import '../components_css/Signin.css';
import facebook_icon from '../img/signin_facebook_icon.png';
import google_icon from '../img/signin_google_icon.png';
import github_icon from '../img/signin_github_icon.png';
import logo from '../img/LOGO.png'

const Signin = (url) => { 
  url = url.url;
    
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showMessageSuccess = (message, duration = 5000) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, duration);
  };
  
  const showMessageError = (message, duration = 5000) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, duration);
  };

  const handleInputChange = (event)=>{
    const value =event.target.value;
    setFormData({
      ...formData,
      [event.target.name]:value,
    });}

  const fetchUsers = async () => {
    try {
      const result = await url.get('/users/get/');
      setUser(result.data);
      //console.log(result.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  useEffect(()=>{
    setTimeout(()=>{
      fetchUsers();
    },1);
  },[]);

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log('form data:', formData);
      try {
        await url.post('/auth/create_user/', formData);
        await fetchUsers();
        console.log('aqui esta el fetch:', fetchUsers);
        setFormData({
          username: '',
          email: '',
          password: ''
        });
        showMessageSuccess('User Created Successfully 😎');
      } catch (error) {
        console.error('ERROR AL CREAR USUARIO:', error);
        showMessageError('User Create Error 💀');
      }
    };
  
  return(
    <div className="Signin_container">
      <nav className='signin_navbar'>
        <div className='logo_image'>
          <img src={logo} alt='logo' />

        </div>
        <div className='title'>       
         <h1 id='main_title'>MasterVault</h1>
        </div>
      </nav>
      <div className='signin_welcome_form'>

        <div className='welcome_signin'>
          <h2>Welcome to MasterVault</h2>
          <p>Sign in to create your account</p>
          <div className='signin_ICONS'>
            <span className='signin_icon'> 
              <img src={facebook_icon} alt='facebook_icon' />
            </span>
            <span className='signin_icon'> 
              <img src={google_icon} alt='google_icon' />
            </span>
            <span className='signin_icon'> 
              <img src={github_icon} alt='github_icon' />
            </span>
          </div>
         
          <p id='signin_login_mesagge'>Or if you have an account <a href={''}>LOGIN</a></p>
        </div>

        <div className='form_signin'>
        <form onSubmit={handleFormSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input placeholder='Your Username' type='text' name='username' id='username' value={formData.username} onChange={handleInputChange} />
              <label htmlFor='email'>Email</label>
              <input placeholder='Your Email' type='email' name='email' id='email' value={formData.email} onChange={handleInputChange} />
              <label htmlFor='password'>Password</label>
              <input placeholder='Your Password' type='password' name='password' id='password' value={formData.password} onChange={handleInputChange} />
              <button type='submit' className='signin_button'>SignIn</button>
            </div>
          </form>
          {successMessage && <div className="message-container_successful">{successMessage}</div>}
           {errorMessage && <div className="message-container_error">{errorMessage}</div>}
        </div>
      </div>
      
    </div>
      
  )

}

export default Signin;