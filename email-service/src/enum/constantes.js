import fs from "fs";
import path from "path";

export const newUser = fs.readFileSync(
  path.join(__dirname, "..", "templates", "new-user.hbs"),
  "utf-8"
);

export const resendAcces = fs.readFileSync(
  path.join(__dirname, "..", "templates", "resend-access.hbs"),
  "utf-8"
);
