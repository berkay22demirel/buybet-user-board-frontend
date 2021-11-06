import React from 'react'
import axios from 'axios'

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

    onClickSignup = event => {
        event.preventDefault();
        const user = {
            username : this.state.username,
            email : this.state.email,
            phone : this.state.phone,
            password : this.state.password,
        }
        this.setState({pendingApiCall: true})
        axios.post("/api/1.0/users",user)
             .then(response => {
                 this.setState({pendingApiCall: false})
             })
             .catch(error => {
                this.setState({pendingApiCall: false})
             });
    }

    render() {
        return (
            <div className="container">
                <div className="card m-4">
                    <form className="m-3">
                        <div className="form-floating mb-3">
                            <input name="username" className="form-control" id="usernameInput" placeholder="example" />
                            <label for="usernameInput">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input name="email" type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
                            <label for="emailInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input name="phone" type="phone" className="form-control" id="phoneInput" placeholder="5554443322" />
                            <label for="phoneInput">Phone Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input name="password" type="password" className="form-control" id="passwordInput" placeholder="example"/>
                            <label for="passwordInput">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input name="passwordRepeat" type="password" className="form-control" id="passwordRepeatInput" placeholder="example" />
                            <label for="passwordRepeatInput">Password repeat</label>
                        </div>
                        <div className="text-center">
                            <button type="button" 
                                    className="btn btn-primary" 
                                    onClick={this.onClickSignup}
                                    disabled={this.state.pendingApiCall}>
                                         {this.state.pendingApiCall && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}