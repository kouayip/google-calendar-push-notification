const dotenv = require("dotenv");

// env config
dotenv.config();

/**
 * @param {string} key
 * @return {string | undefined}
 */
function getEnv(key) {
    const val = process.env[key]
    if(val) return String(val)
    return undefined;
}

module.exports = {
    client_id: getEnv('GOOGLE_CLIENT_ID'),
    client_secret: getEnv('GOOGLE_CLIENT_SECRET'),
    refresh_token: getEnv('GOOGLE_REFRESH_TOKEN')
}
