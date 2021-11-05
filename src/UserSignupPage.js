import React from 'react'
import axios from 'axios'

export class UserSignupPage extends React.Component {

    state = {
        username : null,
        email : null,
        phone : null,
        password : null,
        passwordRepeat : null
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
        axios.post("/api/1.0/users",user);
    }

    render() {
        return (
            <form>
                <h1>Sign Up</h1>
                <div>
                    <label>Username</label>
                    <input name="username" onChange={this.onChange}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input name="email" onChange={this.onChange}></input>
                </div>
                <div>
                    <label>Phone</label>
                    <input name="phone" onChange={this.onChange}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" onChange={this.onChange}></input>
                </div>
                <div>
                    <label>passwordRepeat</label>
                    <input name="passwordRepeat" type="password" onChange={this.onChange}></input>
                </div>
                <button onClick={this.onClickSignup}>Sign Up</button>
            </form>
        );
    }
}