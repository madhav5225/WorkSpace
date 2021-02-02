var session = require("express-session");
const setSession = (app) => {
  app.use(
    session({
      key: process.env.session_key,
      secret: process.env.session_secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 24 * 60 * 60 * 1000,
      },
    })
  );
  // console.log('Session is set');
}
module.exports = setSession;