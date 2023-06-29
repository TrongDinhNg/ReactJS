import axios from "../axios";

const userService = {
    login(email, password) {
        return axios.post("/api/login", { email, password });
    },
};
export default userService;
