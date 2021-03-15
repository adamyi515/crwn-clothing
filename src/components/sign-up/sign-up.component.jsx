import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (ev) => {
        ev.preventDefault(); // Prevent the default onsubmit form behavior.
        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert("Password don't match.");
            return;
        }

        try {

            // This creates a new user if user does not exist
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            
            await createUserProfileDocument(user, { displayName });

            // Once the user signs up, set the state to empty string. (This will empty out all of input as well.)
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch(error){
            console.log(error);
        }

    }

    handleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({[name]: value})
    }


    render(){
        const { displayName, email, password, confirmPassword } = this.state;

        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className="sign-up-form" onSubmit={this.handleSubmit}>

                    <FormInput type="text" name="displayName" value={displayName} 
                        onChange={this.handleChange} required label="Display Name" />

                    <FormInput type="email" name="email" value={email} 
                        onChange={this.handleChange} required label="Email" />

                    <FormInput type="password" name="password" value={password} 
                        onChange={this.handleChange} required label="Password" />

                    <FormInput type="password" name="confirmPassword" value={confirmPassword} 
                        onChange={this.handleChange} required label="Confirm Password" />

                    <CustomButton type="submit">Sign Up</CustomButton>

                </form>

            </div>
        )
    }
}

export default SignUp;