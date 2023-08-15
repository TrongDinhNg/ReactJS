import axios from "../axios";

const userService = {
    login(email, password) {
        return axios.post("/api/login", { email, password });
    },

    getAllUsers(inputId) {
        return axios.get(`/api/get-all-users?id=${inputId}`);
    },
    createNewUserService(data) {
        return axios.post("/api/create-new-user", data);
    },
    deleteUserService(userId) {
        return axios.delete("/api/delete-user", {
            data: {
                id: userId,
            },
        });
    },
    editUserService(data) {
        return axios.put("/api/edit-user", data);
    },
    getAllcodeService(inputType) {
        return axios.get(`/api/allcode?type=${inputType}`);
    },

    getTopDoctorService(limit) {
        return axios.get(`/api/top-doctor-home?limit=${limit}`);
    },
    getAllDoctor() {
        return axios.get(`/api/get-all-doctor`);
    },
    saveInforDoctorService(data) {
        return axios.post("/api/save-infor-doctor", data);
    },
    getDetailDoctorService(id) {
        return axios.get(`/api/get-infor-doctor-by-id?id=${id}`);
    },
    getMarkdownByDoctorIdService(doctorId) {
        return axios.get(`/api/get-markdown-by-doctor-id?doctorId=${doctorId}`);
    },
    saveBulkScheduleDoctor(data) {
        return axios.post("/api/bulk-create-schedule", data);
    },
    getScheduleDoctorByDate(doctorId, date) {
        return axios.get(
            `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`,
        );
    },
    getExtraInforDoctorsService(doctorId) {
        return axios.get(
            `/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`,
        );
    },
    getProfileDoctorsService(doctorId) {
        return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
    },
    postPatientBookAppointmentService(data) {
        return axios.post("/api/patient-book-appointment", data);
    },
};
export default userService;
