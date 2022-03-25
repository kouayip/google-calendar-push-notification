const {google} = require('googleapis')

module.exports = {
    /**
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    store: async (req, res) => {
        const data = res.locals['calendarWebhookData']

        // Authorization details for google API are explained in previous steps.
        const calendar = google.calendar({ version: 'v3' });
        // Get the events that changed during the webhook timestamp by using timeMin property.
        const event = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        console.log(data)

        // log in the console the total events that changed since the webhook was called.
        console.info(event.data.items);

        return res.status(200).send('Webhook received');

    },

    event: async (req, res) => {
        const { eventId } = req.params;
        const data = res.locals['calendarWebhookData']

        console.log(data)

        console.log(`Webhook event for ${eventId}`)
    }
}
