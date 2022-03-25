const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        version: "v1.0",
        date: new Date()
    });
});


router.use((req, res) => {
    res.status(404).send("<h1>Custom Page Not Found</h1>");
});

module.exports = router;
