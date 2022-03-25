const express = require("express");
const apis = require("./api.route");
const webhooks = require("./webhook.route");

const router = express.Router();

router.use('/webhook', webhooks);
router.use('/api', apis);

router.use((req, res) => {
    res.status(404).send("<h1>Custom Page Not Found</h1>");
});

module.exports = router;
