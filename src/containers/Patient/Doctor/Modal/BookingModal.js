import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postBookAppointment } from '../../../../services/userService';
import { toast } from "react-toastify";
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';
import Validation from '../../../Auth/Validation';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
            },
            birthday: '',
            selectedGender: '',
            timeType: '',
            doctorId: '',
            genders: '',
            isShownLoading: false,
            errors: {}
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['fullName', 'phoneNumber', 'email', 'address', 'reason']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state.values[arrCheck[i]]) {
                isValid = false;
                toast.info('Missing input is required: ' + arrCheck[i])
                break;
            }
        }
        if (!this.state.birthday || isNaN(new Date(this.state.birthday))) {
            toast.error("Invalid birthday");
            return;
        }
        if (!this.state.birthday) {
            isValid = false;
            toast.info("Missing birthday");
        }
        console.log("birthday raw:", this.state.birthday);
        console.log("birthday type:", typeof this.state.birthday);
        return isValid
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    OnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state.values };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy

        })

    }
    handleOnChangeInput = (event, id) => {
        this.setState({
            values: {
                ...this.state.values,
                [id]: event.target.value
            }
        });
    }

    // handleOnchangeDatePicker = (date) => {
    //     this.setState({
    //         birthday: date[0]
    //     })
    // }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date
        });
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    }



    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') //convert timestamp -> date của js
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return `${time} - ${date}`

        }
        return '';

    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return '';
    }

    handleConfirmBooking = async () => {
        // let date = new Date(this.state.birthday).getTime();
        
        let date = this.state.birthday
            ? new Date(this.state.birthday).getTime()
            : null;
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let isValid = this.checkValidateInput();

        const validation = new Validation();
        const errors = validation.render(this.state.values);
        console.log('Huynh check errors: ', Object.keys(errors).length)
        console.log('Huynh check errors: ', errors)
        if (isValid && Object.keys(errors).length === 0) {
            this.setState({ isShownLoading: true });

            try {
                let res = await postBookAppointment({
                    fullName: this.state.values.fullName,
                    phoneNumber: this.state.values.phoneNumber,
                    email: this.state.values.email,
                    address: this.state.values.address,
                    reason: this.state.values.reason,
                    date: this.props.dataTime.date,
                    birthday: date,
                    selectedGender: this.state.selectedGender.value,
                    doctorId: this.state.doctorId,
                    timeType: this.state.timeType,
                    language: this.props.language,
                    timeString: timeString,
                    doctorName: doctorName,
                });
                console.log('Huynh check errors: ', res)

                if (res && res.errCode === 0) {
                    this.setState({ isShownLoading: false });
                    toast.success("Booking a new appointment succeed!");
                    this.props.closeBookingModal();
                } else {
                    toast.error("Booking a new appointment error!");
                }
            } catch (error) {
                this.setState({ isShownLoading: false });
                console.error("Error in booking appointment:", error);
                toast.error("An error occurred while booking appointment.");
            }
        } else {
            this.setState({
                errors
            })
        }
    }


    handleValidateForm = (event) => {
        event.preventDefault();
        const validation = new Validation();
        const errors = validation.render(this.state.values);
        this.setState({ errors });
    }

    render() {
        console.log('Huynh check this state: ', this.state.values)

        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let { fullName, email, address, phoneNumber, reason } = this.state.values;

        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        let { errors } = this.state;

        return (
            <LoadingOverlay
                active={this.state.isShownLoading}
                spinner
                text='Loading...'

            >
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >

                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className='right'
                                onClick={closeBookingModal}
                            >
                                <i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-info'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <form
                                onSubmit={(event) => this.handleValidateForm(event)}
                            >
                                <div className='row'>

                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.fullname" />
                                        </label>
                                        <input className='form-control'
                                            value={fullName}
                                            onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                        />
                                        {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.phonenumber" />
                                        </label>
                                        <input className='form-control'
                                            value={phoneNumber}
                                            onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                        />
                                        {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.email" />
                                        </label>
                                        <input className='form-control'
                                            value={email}
                                            onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        />
                                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.address" />
                                        </label>
                                        <input className='form-control'
                                            value={address}
                                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        />
                                        {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
                                    </div>
                                    <div className='col-12 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.reason" />
                                        </label>
                                        <input className='form-control'
                                            value={reason}
                                            onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                        />
                                        {errors.reason && <p style={{ color: 'red' }}>{errors.reason}</p>}
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.birthday" />
                                        </label>
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleOnchangeDatePicker}
                                            value={this.state.birthday}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.gender" />
                                        </label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                </div>
                            </form>


                            {/* {JSON.stringify(dataTime)} */}
                            {/* convert object -> string  */}
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBooking()}
                            >
                                <FormattedMessage id="patient.booking-modal.confirm" />
                            </button>
                            <button className='btn-booking-cancel'
                                onClick={closeBookingModal}
                            >
                                <FormattedMessage id="patient.booking-modal.cancel" />
                            </button>
                        </div>
                    </div>

                </Modal>
            </LoadingOverlay>
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
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
