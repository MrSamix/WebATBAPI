const API_URL = import.meta.env.VITE_API_URL;
const API_IMAGE_URL = `${API_URL}/images/`
const API_SMALL_IMAGE_URL = `${API_IMAGE_URL}200_`

const CLIENT_ID_OAUTH_GOOGLE = import.meta.env.VITE_CLIENT_ID_OAUTH_GOOGLE;

const APP_ENV = {
    API_URL,
    API_IMAGE_URL,
    API_SMALL_IMAGE_URL,
    CLIENT_ID_OAUTH_GOOGLE
}

export default APP_ENV;