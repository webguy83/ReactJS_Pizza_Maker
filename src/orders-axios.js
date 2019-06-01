import axios from 'axios';

const inst = axios.create({
    baseURL: "https://pizza-maker-380a0.firebaseio.com/"
})

export default inst;