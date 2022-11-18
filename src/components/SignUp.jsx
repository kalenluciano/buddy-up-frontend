import { Link } from "react-router-dom"
import '../styling/SignUp.css'

const SignUp = () => {
return(
    <div className="SignUp">
        <h2>If you would like to match with a buddy, click to sign up</h2>
        <Link to={'/register'}><button>BuddyUp</button></Link>
    </div>
    
)
} 
export default SignUp