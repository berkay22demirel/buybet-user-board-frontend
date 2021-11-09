import React from 'react'
import {signup} from '../api/userApiCalls'

export class UserSignupPage extends React.Component {

    state = {
        username : null,
        email : null,
        phone : null,
        password : null,
        passwordRepeat : null,
        pendingApiCall: false
    }

    onChange = event => {
        const {name, value } = event.target;
        this.setState({
            [name] : value
        })
    }

    onClickSignup = async event => {
        event.preventDefault();
        const user = {
            username : this.state.username,
            email : this.state.email,
            phone : this.state.phone,
            password : this.state.password,
        }
        this.setState({pendingApiCall: true})
        try {
            await signup(user);
        } catch(error) {
            
        }
        this.setState({pendingApiCall: false})
    }

    render() {
        return (
            <div className="container-fluid content-row p-4">
                <div class="row">
                    <div class="col-sm-12 col-lg-6 offset-lg-3">
                        <div className="card h-100 p-4">
                            <h1>Sign up for free</h1>
                            <form className="m-3">
                                <div className="form-floating mb-3">
                                    <input name="username" className="form-control" id="usernameInput" placeholder="example" onChange={this.onChange} required/>
                                    <label for="usernameInput">Username</label>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input name="email" type="email" className="form-control" id="emailInput" placeholder="name@example.com" onChange={this.onChange} />
                                    <label for="emailInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input name="phone" type="phone" className="form-control" id="phoneInput" placeholder="5554443322" onChange={this.onChange} />
                                    <label for="phoneInput">Phone Number</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input name="password" type="password" className="form-control" id="passwordInput" placeholder="example" onChange={this.onChange} />
                                    <label for="passwordInput">Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input name="passwordRepeat" type="password" className="form-control" id="passwordRepeatInput" placeholder="example" onChange={this.onChange} />
                                    <label for="passwordRepeatInput">Password repeat</label>
                                </div>
                                <div className="text-center">
                                    <button type="button" 
                                            className="btn btn-primary w-100" 
                                            onClick={this.onClickSignup}
                                            disabled={this.state.pendingApiCall}>
                                                {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}