const {CalendarEvent} = require("../service/google.service");

/**
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @return {Promise<void>}
 */
module.exports = async (req, res, next) => {
    const resourceId = req.headers['x-goog-resource-id'];
    const channelToken = req.headers['x-goog-channel-token'];
    const channelId = req.headers['x-goog-channel-id'];
    const resourceState = req.headers['x-goog-resource-state'];

    // Use the channel token to validate the webhook
    if (channelToken !== CalendarEvent.webhookToken) {
        return res.status(403).send('Invalid webhook token');
    }

    if (resourceState === 'sync') {
        return res.status(200).send();
    }

    res.locals['calendarWebhookData'] = {resourceId, channelToken, channelId, resourceState}

    next()
}
