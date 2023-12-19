import axios from "axios";

const BASE_URL = "https://api.blog.redberryinternship.ge/api";
const AUTH_TOKEN =
	"3469d59c9ca9a09af45be8f8c40161572e776eba1c9ac7549c06ea03839ba5e5";

export const axiosFetch = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${AUTH_TOKEN}`,
		Accept: "application/json",
	},
});
