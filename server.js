const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

// if process.env.PORT does not exist, port number will be 3000
const port = process.env.PORT || 3000;
var app = express();

var now = new Date().toString();


// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance is ongoing',
//     maintenanceMessage: 'Please come back in an hour.'
//   });
// });

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var log = (`${now}: ${req.method} ${req.url}, from ${req.ip}`);
  fs.appendFile('server.log', log + '\n');
  console.log(log);
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

app.get('/logs', (req,res) => {
  res.render('logs.hbs', {
    pageTitle: 'logs',
    date: now,
    method: req.method,
    ip: req.ip,
    ips: req.ips,
    protocol: req.protocol
  })
})

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'project Page'
  });
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
})


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to hande request"
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
