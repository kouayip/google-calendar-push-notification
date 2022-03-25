const chalk = require("chalk");
const app = require("./app");
const {CalendarEvent} = require("./service/google.service");

const PORT = process.env.PORT || 3001;

// Use to run a server listener
function start(port) {
    app.listen(port, () => {

        const calendar = new CalendarEvent()

        calendar.on('tunnel', ( message, tunnel, date) => {
            console.log({message, tunnel, date})
        })

        calendar.on('watch', ( response, date) => {
            console.log({response, date})
        })

        calendar.registerEventWatch().catch(reason => {
            console.log(chalk.red(`${reason}`))
        })

        console.log(chalk.yellow(`✨ Server is listening on port ${port}`));
    });
}

/**
 * Entry point
 */
start(PORT);
