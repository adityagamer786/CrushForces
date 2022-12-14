import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import {useState} from 'react'
import {useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom'
const {v4: uuidv4} = require('uuid')


const Home = () => {
  let navigate = useNavigate() 
  const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const handleClick = () => {
        if (authToken) {
            removeCookie('Username', cookies.Username)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className="overlay">
            <Nav
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="primary-title">Swipe Right®</h1>
                <button className="primary-button" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </button>
                <button className="primary-button" onClick={() => navigate('/profile')}>
                  Profile
                </button>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>


                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
            </div>
        </div>
    )
}
export default Home
