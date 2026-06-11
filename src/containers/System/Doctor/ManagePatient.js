import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import _ from 'lodash';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { getListPatientForDoctor, sendRemedy } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import RemedyModal from '../../System/Doctor/RemedyModal';
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('days').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.getDataPatient();

    }

    getDataPatient = async () => {
        let { userInfo } = this.props;
        let { currentDate } = this.state;

        let formatDate = new Date(currentDate).getTime();
        let res = await getListPatientForDoctor({
            doctorId: userInfo.id,
            date: formatDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.language !== this.props.language) {

        }

    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleBtnConfirm = (item) => {
        console.log('Huynh check item: ', item)
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        fileName: this.state.fileName,
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {

        let { dataModal } = this.state;

        this.setState({
            isShowLoading: true
        })

        let res = await sendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.firstName,
            fileName: dataChild.fileName
        })



        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy success....')
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Something wrongs!!!')
            console.log('Error send remedy: ', res)
        }
    }


    render() {
        let { language } = this.props;
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='patient-container'>
                        <div className='m-p-title'>
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnchangeDatePicker}
                                    value={this.state.currentDate}
                                />
                            </div>

                            <div className='col-12 table-manage-patient'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <td>Thời gian</td>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Actions</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {language === LANGUAGES.VI ?
                                                                `${item.timeTypeDataPatient.valueVi}`
                                                                :
                                                                `${item.timeTypeDataPatient.valueEn}`
                                                            }
                                                        </td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>
                                                
                                                            {language === LANGUAGES.VI ?
                                                                `${item.patientData.genderData.valueVi}`
                                                                :
                                                                `${item.patientData.genderData.valueEn}`
                                                            }
                                                        </td>
                                                        <td>
                                                            <button className='mp-btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >
                                                                Xác nhận

                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan={'6'} style={{ textAlign: 'center' }}>
                                                    Không có lịch hẹn
                                                </td>

                                            </tr>
                                        }

                                    </tbody>

                                </table>
                            </div>

                        </div>


                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />

                </LoadingOverlay>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin1.allDoctors,
        allScheduleTime: state.admin1.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
