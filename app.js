const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 80;
const app = express();
const server = http.createServer(app);

// if you do not need to signe cookies, just use cookieParser with no arguments
app.use(cookieParser('@qny!uTwaPc0ThHjCybF#O^FO6FV$p*4Q5DKeoZ%kN^6FtNmwF'));

const cookieConfig = {
  httpOnly: true, // to disable accessing cookie via client side js
  //secure: true, // to force https (if you use it)
  //maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
  signed: true // if you use the secret with cookieParser
};

app.get('/set', (req, res) => {  
  res.cookie('paulo', {
    prueba: true
  }, cookieConfig);
  res.send('setting cookie');
});

app.get('/get', (req, res) => {  
  const signedCookies = req.signedCookies;

  //get signed cookies
  console.log('signed-cookies:', signedCookies);
  const cookies = req.cookies;

  // get not signed cookies
  console.log('not-signed-cookies:', cookies);
  // or access directly to one cookie by its name :
  const myTestCookie = req.signedCookies.paulo;
  console.log('our signed cookie:', myTestCookie.prueba);
  res.send('getting cookies');
});

// start server
server.listen(port, () => {
  console.log(`Dev server is accessible at http://localhost:${port}`);
});
