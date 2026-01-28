import { Button } from 'flowbite-react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { AiFillGoogleCircle } from 'react-icons/ai'
import { app } from '../firebase';
import { signInSuccess } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async()=>{
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({prompt: 'select_account'});
        try{
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            
            const res = await fetch("api/v1/auth/signin", {
                method: 'POST',
                'Content-Type': 'application/json',
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            })
            // console.log(resultsFromGoogle);
            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
            
        }catch(e){
            console.error("Error signing in", e.message);
            
        }
    }
  
    return (
    <Button type='button' gradientduotone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with google
    </Button>
  )
}

export default OAuth