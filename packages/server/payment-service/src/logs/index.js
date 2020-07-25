import { createLogger, format, transports } from "winston";
import { dateFormate } from "../utils/dateUtils";
const { combine, timestamp, prettyPrint } = format;
export const logger = createLogger({
  format: combine(timestamp({ format: dateFormate() }), prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: __dirname + "/error.log",
      level: "error"
    }),
    new transports.File({ filename: __dirname + "/info.log", level: "info" })
  ],
  exitOnError: false
});
