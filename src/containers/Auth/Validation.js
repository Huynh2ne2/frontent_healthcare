import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';



class Validation extends Component {


    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render(values) {
        const errors = {};
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
        const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;
        const phonenumber_pattern = /^[0-9]\d{9}$/;
        const fullname_pattern = /^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$/;
        const address_pattern = /^.{5,}$/;
        const reason_pattern = /^.{5,}$/;

        if (!email_pattern.test(values.email)) {
            errors.email = "Email not format. Ex: email_name@gmail.com"
        }
        if (!password_pattern.test(values.password)) {
            errors.password = "Password must be at least 8 chracters long"
        }

        if (!phonenumber_pattern.test(values.phoneNumber)) {
            errors.phoneNumber = "Please enter valid 10 digit phone number"
        }


        if (!address_pattern.test(values.address)) {
            errors.address = "Address must have at least 5 characters"
        }

        if (!reason_pattern.test(values.reason)) {
            errors.reason = "Reason must have at least 5 characters"
        }

        return errors;
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default Validation;
