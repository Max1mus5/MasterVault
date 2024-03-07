import React,{useState, useEffect} from 'react';//react hooks, useState and useEffect for state and lifecycle
import '../components_css/Signin.css';
import facebook_icon from '../img/signin_facebook_icon.png';
import google_icon from '../img/signin_google_icon.png';
import github_icon from '../img/signin_github_icon.png';
import logo from '../img/LOGO.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Signin = (url) => { 
  const navigate = useNavigate();
  url = url.url;
    
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');

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
        showMessageSuccess('User Created Successfully 😎\nPlease Login To Verify');
        setTimeout(() => navigate('/login'), 3000)
      } catch (error) {
        console.error('ERROR AL CREAR USUARIO:', error);
        if (error.response.data.detail === 'Username already exists') {
          showMessageError('Username already exists');
        } else if(error.response.data.detail === 'Email already exists'){
          showMessageError('Email already exists');
        }else {
        showMessageError('User Create Error 💀');
        }
       
      }
    };

    const popToMyGitHub = () => {
      showMessageSuccess('GOT YOU 😁', 2000);
      /* open in a new window and wait 2s */
      setTimeout(() => window.open(' https://github.com/Max1mus5?tab=repositories'), 1000);
    }

    const showTemporaryMessage = (message, timeout = 5000) => {
      setFormMessage(message);
        setTimeout(() => {
        setFormMessage('');
      }, timeout);
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
            <span className='signin_icon' onClick={popToMyGitHub}> 
              <img src={github_icon} alt='github_icon' />
            </span>
          </div>
         
          <p id='signin_login_mesagge'>Or if you have an account <Link to='/login'>LOGIN</Link> </p>
        </div>

        <div className='form_signin'>
        <form onSubmit={handleFormSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input placeholder='Your Username' type='text' name='username' id='username' value={formData.username} onChange={handleInputChange} />
              <label htmlFor='email'>Email</label>
              <input placeholder='Your Email' type='email' name='email' id='email' value={formData.email} onChange={handleInputChange} />
              <label htmlFor='password'>Password</label>
              <input placeholder='Your Password' type='password' name='password' id='password' value={formData.password} onChange={handleInputChange} onClick={() => showTemporaryMessage('Remember to use at least 8 Caracters 💪')}/>
              {formMessage && <div className="message-container">{formMessage}</div>}
              <button type='submit' className='signin_button'><Link to='/Dashboard'></Link>SignIn</button>
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