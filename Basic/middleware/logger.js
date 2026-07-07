import fs from "fs";

const logger = (req, res, next) => {
    const time = new Date().toLocaleString();
    const log = `${req.method} on ${req.url} at ${time} by ${req.ip}`;
    console.log(log.trim());
    fs.appendFile("log.txt", log + "\n", (err) => {
        if (err) {
            console.log("error in writing log file", err);
        }
    });
    next();
}
export default logger;