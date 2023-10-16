import axios from 'axios';

export const BASE_URL = 'https://headers.scrapeops.io/v1/user-agents';

const options = {
	params: {
		num_headers: 2,
	},
	headers: {
		'api_key': process.env.RANDOM_USER_AGENT,
	},
};

export const fetchFromAPI = async (url) => {
	const { data } = await axios.get(`${BASE_URL}`, options);

	return data;
};