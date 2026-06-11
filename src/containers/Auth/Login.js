import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
// import userActions from "../../store/actions/userActions";
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions/userActions';
import { withRouter } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                email: '',
                password: '',
            },
            errors: {},
            isShowPassword: false,
            errMessage: ''
        }
    }
    OnChangeInput = (event, id) => {
        this.setState({
            values: {
                ...this.state.values,
                [id]: event.target.value
            }
        });
    }

    handleKeyDown = (event) => {
        // console.log('huynh check key down: ', event);
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    handleLogin = async () => {
    
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.values.email, this.state.values.password);
            // console.log('huynh check : ', data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('Login succeed!!!');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('Huynh check err.response: ', error.response)
        }
    }


    hanldeShowHidePassWord = () => {
        //chỉnh lại
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    renderRegister = () => {
        if (this.props.history) {
            return this.props.history.push('/register')
        }
    }

    //khi component trước khi render thì nó sẽ chạy trong hàm tạo
    render() {
        //JSX
        let { email, password } = this.state.values;
        let { errors } = this.state;
        console.log('Huynh check prop: isLoggedIn ', this.props.isLoggedIn)

        return (
             <div className="login-background">
                <div className="login-wrapper">
    <div className="login-card">

        <div className="welcome-text">
            Chào mừng trở lại! 👋
        </div>

        <h1>Đăng nhập</h1>

        <p className="sub-title">
            Vui lòng đăng nhập để tiếp tục sử dụng hệ thống
        </p>

        <div className="form-group">
            <label>Email</label>

            <div className="input-box">
                <i className="far fa-envelope"></i>

                <input
                    type="text"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(event) =>
                        this.OnChangeInput(event, "email")
                    }
                />
            </div>
        </div>


        <div className="form-group">
            <label>Mật khẩu</label>

            <div className="input-box">
                <i className="fas fa-lock"></i>

                <input
                    type={
                        this.state.isShowPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="Nhập mật khẩu của bạn"
                    value={password}
                    onChange={(event) =>
                        this.OnChangeInput(event, "password")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                />

                <span
                    className="eye-icon"
                    onClick={() =>
                        this.hanldeShowHidePassWord()
                    }
                >
                    <i
                        className={
                            this.state.isShowPassword
                                ? "far fa-eye"
                                : "far fa-eye-slash"
                        }
                    />
                </span>
            </div>
        </div>

        <div className="login-options">
            <label>
                <input type="checkbox" />
                Ghi nhớ đăng nhập
            </label>

            <span>Quên mật khẩu?</span>
        </div>

        <button
            className="btn-login"
            onClick={() => this.handleLogin()}
        >
            <i className="fas fa-lock"></i>
            Đăng nhập
        </button>

        <div className="divider">
            <span>hoặc đăng nhập với</span>
        </div>

        <div className="social-login">

            <button>
                <i className="fab fa-google"></i>
                Google
            </button>

            <button>
                <i className="fab fa-facebook-f"></i>
                Facebook
            </button>

            <button>
                <i className="fab fa-apple"></i>
                Apple
            </button>

        </div>

        <div className="register-link">
            Bạn chưa có tài khoản?
            <span
            style={{ cursor: 'pointer' }}
                            onClick={() => this.renderRegister()}
            > Đăng ký ngay</span>
        </div>

    </div>
</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        // userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
