const EventEmitter = require("events");
const crypto = require('crypto');
const {google} = require('googleapis')
const localtunnel = require('localtunnel');
const {v4: uuidv4} = require('uuid');

/**
 * @class CalendarService
 */
class CalendarService {

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function?} callback The callback to call with the authorized client.
     * @return {*}
     */
    static authorize(credentials, callback) {
        const {OAuth2} = google.auth
        const {client_secret, client_id, refresh_token} = credentials;
        const oAuth2Client = new OAuth2(client_id, client_secret)

        //
        oAuth2Client.setCredentials({refresh_token})
        if (callback) callback(oAuth2Client)

        return oAuth2Client
    }

    /**
     * Get calendar client
     * @return {calendar_v3.Calendar}
     */
    static getCalendarInstance() {
        const oAuth2Client = this.authorize({
            client_id: '',
            client_secret: '',
            refresh_token: ''
        })
        google.options({auth: oAuth2Client})
        // Create a new calendar instance.
        return google.calendar({version: 'v3', auth: oAuth2Client});
    }
}

/**
 * @class CalendarEvent
 */
class CalendarEvent extends EventEmitter {
    static webhookToken = crypto.randomBytes(32).toString('hex');

    /**
     * Create local tunnel
     * @param {number} port
     * @param {function?} callback
     * @returns {Promise<unknown>}
     */
    async createTunnel(port, callback) {
        const tunnel = await localtunnel({port});

        tunnel.on('open', () => {
            // tunnels are opened
            callback("tunnels are opened")
        })

        tunnel.on('close', () => {
            // tunnels are closed
            callback("tunnels are closed")
        });

        // the assigned public url for your tunnel
        // i.e. https://abcdefgjhij.localtunnel.me
        return tunnel;
    }

    async registerEventWatch() {
        const calendar = CalendarService.getCalendarInstance()
        const tunnel = await this.createTunnel(3001, (message) => {
            this.emit('tunnel', message, tunnel, new Date())
        });

        try {
            const watchResponse = await calendar.events.watch({
                calendarId: '60r9j555ada7ieqiohej6a8635q5m9l1@import.calendar.google.com',
                requestBody: {
                    id: uuidv4(),
                    type: 'web_hook',
                    address: `${tunnel.url}/webhook`,
                    token: CalendarEvent.webhookToken,
                },
            })

            console.log(watchResponse)

            this.emit('watch', watchResponse, new Date())
        } catch (error) {
            console.log.error(`Failed to create watcher for event`);
        }
    }

    delete() {

    }

    stop() {

    }
}

module.exports = {CalendarService, CalendarEvent}
