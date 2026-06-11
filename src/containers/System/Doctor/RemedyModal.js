import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './RemedyModal.scss';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

import { toast } from "react-toastify";
import moment from 'moment';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
            fileName:''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })

        }
    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnchangeimage = async (event) => {
        let data = event.target.files;
        let file = data[0];
         console.log('FILE:', file);
    console.log('FILE NAME:', file.name);
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imgBase64: base64,
                fileName: file.name
            })
        }
    }
    handlesendRemedy = () => {
        console.log('STATE SEND file remedy:', this.state);
        this.props.sendRemedy(this.state)
    }
    render() {
        let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props;

        return (

            <Modal
                isOpen={isOpenModal}
                size="md"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Gửi hóa đơn khám bệnh</h5>
                    <button type="button"
                        className="close"
                        aria-label="Close"
                        onClick={closeRemedyModal}
                    >
                        <span>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email</label>
                            <input className='form-control'
                                type='email'
                                value={this.state.email}
                                onChange={(event) => this.handleOnchangeEmail(event)}

                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn file đơn thuốc</label>
                            <input className='form-control-file'
                                type='file'
                                onChange={(event) => this.handleOnchangeimage(event)}
                            />

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handlesendRemedy()}>
                        Send
                    </Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin1.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
