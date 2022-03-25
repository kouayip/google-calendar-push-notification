const {google} = require('googleapis')

const {OAuth2} = google.auth

const oAuth2Client = new OAuth2(
    '294457841428-rfjv06vh9ac682su8bevv7c3ncd3msuj.apps.googleusercontent.com',
    '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'
)

oAuth2Client.setCredentials({
    refresh_token:
        '1//04MHLM7gAagR8CgYIARAAGAQSNwF-L9Irb_ZcRSWEOBbtnezkflgZ8QURQa3d_uGYJr5PHe2nFgO596RdslpT_7NrsqlCxJIFHdA'
})


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, refresh_token} = credentials;
    const oAuth2Client = new OAuth2(client_id,  client_secret)

    //
    oAuth2Client.setCredentials({refresh_token})
    callback(oAuth2Client)
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {number} size
 */
function listEvents(size = 10) {
    // Create a new calendar instance.
    const calendar = google.calendar({version: 'v3', auth: oAuth2Client})

    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: size,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log(`Upcoming ${size} events:`);
            events.map((event, i) => {
                console.log(event)
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }
    });
}

module.exports = {listEvents}



