import axios from "axios";

const HOST = "https://server-production-1055.up.railway.app";
const ACTION = `${HOST}/feedback`;

export const send = async (form) => {
    return await axios.post(ACTION, {
        email: form.email
    })
}