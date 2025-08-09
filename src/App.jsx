import React,{useEffect,useState} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginStudent from './pages/LoginStudent';
import LoginMentor from './pages/LoginMentor';
import SIgnupStudent from './pages/SIgnupStudent';
import SignUpMentor from './pages/SignUpMentor';
import './App.css'
import EmailVerification from './components/EmailVerification';
import EmailVerificationrec from './components/EmailVerificationrec';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ForgotPasswordrec from './pages/ForgotPasswordrec';
import Resetpasswordrec from './pages/Resetpasswordrec';
import ChatBot from './components/ChatBot';
import StartPage from './pages/StartPage';
import HomeMain from './pages/HomeMain';
import ChatComponent from './components/ChatComponent';
import HomeMainMentor from './pages/Homemainmentor';
import { ChatProvider } from './store/ChatContext';

const router=createBrowserRouter([
  {
    path:'/',
    element:<StartPage/>
  },
  {
    path:'/user-login',
    element:<LoginStudent/>
  },
  {
    path:'/mentor-login',
    element:<LoginMentor/>
  },
  {
    path:'/user-signup',
    element:<SIgnupStudent/>
  },
  {
    path:'/mentor-signup',
    element:<SignUpMentor/>
  },
  {
    path:'/email-verify',
    element:<EmailVerification/>
  },
  {
    path:'/email-verifyrec',
    element:<EmailVerificationrec/>
  },
  {
    path:'/forgot-paasword',
    element:<ForgotPassword/>
  },
  {
    path:'/chat1',
    element:<ChatComponent currentUserId="6895b444086864796d60f0ac" chatWithUserId="6896369789a9a0775e8284ae" show={true} onClose={() => {}} />
  },
  {
    path:'/chat2',
    element:<ChatComponent currentUserId="6896369789a9a0775e8284ae" chatWithUserId="6895b444086864796d60f0ac" show={true} onClose={() => {}} />
  },
  {
    path:'/reset-paasword/:token',
    element:<ResetPassword/>
  },
  {
    path:'/main-mentor',
    element:<HomeMainMentor/>
  },
  {
    path:'/forgot-paaswordrec',
    element:<ForgotPasswordrec/>
  },
  {
    path:'/reset-paasword2/:token',
    element:<Resetpasswordrec/>
  },
  {
    path:'/chat',
    element:<ChatBot/>
  },{
    path:'/main',
    element:<HomeMain/>
  }
])
export default function App() {
    const [currentUserId, setCurrentUserId] = useState(null);
    useEffect(() => {
  const path = window.location.pathname;
  if (path.includes("/main-mentor")) {
    fetch('http://localhost:8000/user/getmentor', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.mentor?._id) setCurrentUserId(data.mentor._id);
      })
      .catch(console.error);
  } else {
    fetch('http://localhost:8000/user/getuser', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.user?._id) setCurrentUserId(data.user._id);
      })
      .catch(console.error);
  }
}, []);

  return (
        <ChatProvider currentUserId={currentUserId}>
    <RouterProvider router={router}/>
        </ChatProvider>
  )
}
