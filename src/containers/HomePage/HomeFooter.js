import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomePage.scss';
import { withRouter } from 'react-router';

class HomeFooter extends Component {

    redirectToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    redirectIntroduce = () => {
        if (this.props.history) {
            this.props.history.push(`/introduce`)
        }
    }

    redirectToPolicy = () => {
        if (this.props.history) {
            this.props.history.push(`/policy`)
        }
    }

    render() {

        return (
            <React.Fragment>
                <div div className='footer' >
                    <div className='footer-left'>
                        <h2><FormattedMessage id="footer.general-information" /></h2>
                        <ul>
                            <li>
                                <a onClick={() => this.redirectToHome()}><FormattedMessage id="footer.home-page" /></a>
                            </li>
                            <li>
                                <a onClick={() => this.redirectIntroduce()}><FormattedMessage id="footer.introduce" /></a>
                            </li>
                            <li>
                                <a onClick={() => this.redirectToPolicy()}><FormattedMessage id="footer.regulations" /></a>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-center'>
                        <h2><FormattedMessage id="footer.address" /></h2>
                        <ul>
                            <ul type="circle">
                                <li><FormattedMessage id="footer.csc" /> </li>
                                <li><FormattedMessage id="footer.cn1" /></li>
                                <li><FormattedMessage id="footer.cn2" /></li>
                            </ul>
                        </ul>
                    </div>
                    <div className='footer-right'>
                        <h2><FormattedMessage id="footer.follow-us" /></h2>
                        <ul class="social">
                            <li>
                                <i class="fab fa-facebook"></i>
                                <a target='_blank' href='#'> Facebook</a>
                            </li>
                            <li><i class="fab fa-twitter-square"></i> Twitter</li>
                            <li><i class="fab fa-instagram"></i> Instagram</li>
                        </ul>
                    </div>
                </div >
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));
