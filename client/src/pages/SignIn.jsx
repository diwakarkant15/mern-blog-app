import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

const SignIn = () => {
  const  [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
  };

  console.log(formData);
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure("Please provide all fields"))
    }
    try{
      dispatch(signInStart());
      const res = await fetch('/api/v1/auth/signin',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if(data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    }catch(e){
      dispatch(signInFailure(e.message));
    }
  };




  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>     
         {/*left side */}
        <div className='flex-1'>
         <Link to="/" className='font-bold text-4xl text-black'>
            <span className='px-2 py-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg dark:text-white'>Diwakar's</span>
            Blog
        </Link>
        <p className='text-sm mt-5 text-black'>
          This is a demo project. You can sign in with your email and password or with Google.
        </p>
        </div>
        {/*right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className='text-sm font-medium text-gray-900! dark:text-black-100!'>Your Email</Label>
              <TextInput type='email' placeholder='Email' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label htmlFor="password" className='text-sm font-medium text-gray-900! dark:text-black-100!'>Your Password</Label>
              <TextInput type='password' placeholder='**************' id='password' onChange={handleChange}/>
            </div>
            <Button gradientduotone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5 text-black'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}


export default SignIn