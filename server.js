const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenance is ongoing',
    maintenanceMessage: 'Please come back in an hour.'
  });
});

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log', log + '\n');

  next();
});



hbs.registerHelper('getCurrentYear', (() => {
  return new Date().getFullYear();
}));

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello there, I do hope you are ok. Enjoy your visit.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
})


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to hande request"
  })
})


app.listen(3000, () => {
  console.log("Server is up on port 3000");
});