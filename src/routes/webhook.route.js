const express = require("express");
const controller = require("../controllers/webhook.controller");
const middleware = require("../middlewares/webhook.middleware");

const router = express.Router();

router.post('/', middleware, controller.store)

router.post('/event/:eventId', middleware, controller.event)

module.exports = router;
