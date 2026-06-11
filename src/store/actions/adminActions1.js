import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDocTorHomeService,
    getAllDocTors, saveDetailDoctor, getAllSpecialty, getAllClinic

} from '../../services/userService';
import { toast } from "react-toastify";
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode == 0) {
                dispatch(fetchGenderSucess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }

        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error: ', e)
        }
    }

}
export const fetchGenderSucess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionSucess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSucess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode == 0) {
                dispatch(fetchPositionSucess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }

        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error: ', e)
        }
    }

}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode == 0) {
                dispatch(fetchRoleSucess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }

        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error: ', e)
        }
    }

}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode == 0) {
                toast.success("Create a new user suceed!");
                dispatch(saveUserSucess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }

        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error: ', e)
        }
    }

}

export const saveUserSucess = () => ({
    type: actionTypes.CREATE_USER_SUCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})



export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllUsers('ALL');

            if (res && res.errCode == 0) {
                dispatch(fetchAllUsersSucess(res.users.reverse()))
            } else {
                toast.error("Fetch all user eror!!!");
                dispatch(fetchAllUsersFailed());
            }

        } catch (e) {
            toast.error("Fetch all user eror!!!");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error: ', e)
        }
    }

}
export const fetchAllUsersSucess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode == 0) {
                toast.success("Delete user suceed!");
                dispatch(deleteUserSucess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Faile user !!!");
                dispatch(deleteUserFailed());
            }

        } catch (e) {
            toast.error("Faile user !!!");
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error: ', e)
        }
    }

}

export const deleteUserSucess = () => ({
    type: actionTypes.DELETE_USER_SUCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userId);
            if (res && res.errCode == 0) {
                toast.success("Update user suceed!");
                dispatch(editUserSucess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update user falied !!!");
                dispatch(editUserFailed());
            }

        } catch (e) {
            toast.error("Update user failed!!!");
            dispatch(editUserFailed());
            console.log('editUserFailed error: ', e)
        }
    }

}

export const editUserSucess = () => ({
    type: actionTypes.EDIT_USER_SUCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDocTorHomeService(10);
            if (res && res.errCode == 0) {
                dispatch(fetchTopDoctorSucess(res.data));
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (e) {
            console.log('fetchTopDoctorFailed: ', e)
            dispatch(fetchTopDoctorFailed());
        }
    }
}

export const fetchTopDoctorSucess = (dataInput) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataDoctors: dataInput
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})



export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDocTors();
            if (res && res.errCode == 0) {
                dispatch(fetchAllDoctorsSucess(res.data));
            } else {
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (e) {
            console.log('fetchAllDoctorsFailed: ', e)
            dispatch(fetchAllDoctorsFailed());
        }
    }
}

export const fetchAllDoctorsSucess = (dataInput) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    dataDr: dataInput
})

export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
})


export const saveDetailInforDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data);
            if (res && res.errCode == 0) {
                toast.success("Save infor detail doctor suceed!");
                dispatch({

                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
                })
            } else {
                toast.error("Save infor detail doctor failed !!!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                });
            }
        } catch (e) {
            toast.error("Save infor detail doctor failed !!!");
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            });
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode == 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            });
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSucess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }

        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredDoctorInforFailed error: ', e)
        }
    }


}

export const fetchRequiredDoctorInforSucess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})

