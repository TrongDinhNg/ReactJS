import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await userService.getAllcodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log("fetchGenderStart Err: ", e);
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllcodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            fetchPositionFailed();
            console.log("fetchPositionFailed Err: ", e);
        }
    };
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllcodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            fetchRoleFailed();
            console.log("fetchRoleFailed Err: ", e);
        }
    };
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUserService(data);
            // console.log("check save user: ", res);
            if (res && res.errCode === 0) {
                toast.success("Create User Success!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            fetchRoleFailed();
            console.log("createNewUser Err: ", e);
        }
    };
};
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

//Table manage User
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.user.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            fetchRoleFailed();
            console.log("fetchAllUsers Err: ", e);
        }
    };
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUserService(userId);
            console.log("check call API delete user: ", res);
            if (res && res.errCode === 0) {
                toast.success("DELETE USER SUCCESS!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("DELETE USER ERROR");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("DELETE USER ERROR");
            fetchRoleFailed();
            console.log("deleteUser Err: ", e);
        }
    };
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});
export const updateUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.editUserService(userId);
            console.log("check call API delete user: ", res);
            if (res && res.errCode === 0) {
                toast.success("UPDATE USER SUCCESS!");
                dispatch(updateUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("UPDATE USER ERROR");
                dispatch(updateUserFailed());
            }
        } catch (e) {
            toast.error("UPDATE USER ERROR");
            updateUserFailed();
            console.log("updateUser Err: ", e);
        }
    };
};
export const updateUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const updateUserFailed = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getTopDoctorService("4");
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (e) {
            fetchTopDoctorFailed();
            console.log("fetchTopDoctor Err: ", e);
        }
    };
};
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: data,
});
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
});

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getTopDoctorService("4");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
                });
            }
        } catch (e) {
            console.log("fetchAllDoctor Err: ", e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
            });
        }
    };
};
export const saveInforDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.saveInforDoctorService(data);
            if (res && res.errCode === 0) {
                if (data.action === "CREATE") {
                    toast.success("Save Infor Doctor Success!");
                } else if (data.action === "EDIT") {
                    toast.success("Update Infor Doctor Success!");
                }
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,
                });
            } else {
                toast.error("Save Infor Doctor Err!");
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_FAIL,
                });
            }
        } catch (e) {
            toast.error("Save Infor Doctor Err!");
            console.log("saveInforDoctor Err: ", e);
            dispatch({
                type: actionTypes.SAVE_INFOR_DOCTOR_FAIL,
            });
        }
    };
};
export const fetchAllcodeScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllcodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    scheduleTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (e) {
            console.log("fetchAllcodeScheduleTime Err: ", e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    };
};

export const getRequiredDoctorInfor = () => {
    return async (dispatch) => {
        try {
            dispatch(getRequiredDoctorInforStart());

            let resPrice = await userService.getAllcodeService("PRICE");
            let resPayment = await userService.getAllcodeService("PAYMENT");
            let resProvince = await userService.getAllcodeService("PROVINCE");
            let resSpecialty = await userService.getAllSpecialtyService();

            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                };
                dispatch(getRequiredDoctorInforSuccess(data));
            } else {
                dispatch(getRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(getRequiredDoctorInforFailed());
        }
    };
};

export const getRequiredDoctorInforStart = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
});

export const getRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: data,
});

export const getRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
