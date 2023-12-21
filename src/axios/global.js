import axios from "axios";

const BASE_URL = "https://api.blog.redberryinternship.ge/api";
const AUTH_TOKEN =
	"3469d59c9ca9a09af45be8f8c40161572e776eba1c9ac7549c06ea03839ba5e5";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
