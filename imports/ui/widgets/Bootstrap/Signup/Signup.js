import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from '/imports/modules/get-input-value';


let component;

const getUserData = () => ({
  email: getInputValue(component.refs.emailAddress),
  password: getInputValue(component.refs.password),
  profile: {
    fullname: getInputValue(component.refs.fullName)
  },
});

const signUp = () => {
  component.setState({isLoading:true});
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      component.setState({isLoading:false});
      Bert.alert(error.reason, 'danger');
    } else {
      Meteor.call('member.signup', function(error,result){
        if(error){
          component.setState({isLoading:false});
          Meteor.logout();
          Bert.alert(error.message+', please contact helpdesk of '+Meteor.settings.public.tenant,'danger');
        }else{
          Meteor.call('sendVerificationEmail');
          Bert.alert('Welcome!', 'success');
          browserHistory.push('/');
        };
      });
    };
  });
};

const validate = () => {
  $(component.refs.signup).validate({
    rules: {
      fullName: {
        required: true,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      fullName: {
        required: 'Full Name?',
      },
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?',
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.',
      },
    },
    submitHandler() { signUp(); },
  });
};

const handleSignup = (options) => {
  component = options.component;
  validate();
};



export class Signup extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <Grid>
      <Row>
        <Col xs={ 12 } sm={ 6 } md={ 4 }>
          <h4 className="page-header">Sign Up</h4>
          <form ref="signup" className="signup" onSubmit={ this.handleSubmit }>
            <FormGroup>
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                type="text"
                ref="fullName"
                name="fullName"
                placeholder="Full Name"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="text"
                ref="emailAddress"
                name="emailAddress"
                placeholder="Email Address"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                ref="password"
                name="password"
                placeholder="Password"
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">Sign Up</Button>
          </form>
          <p>Already have an account? <Link to="/login">Log In</Link>.</p>
        </Col>
      </Row>
    </Grid>;
  }
}
