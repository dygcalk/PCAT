const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
var methodOverride = require('method-override');

const photoController = require('./controllers/photo');
const pageController = require('./controllers/page');

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://pcat:pcat123@pcat.fik8cbg.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('DB connected');
  } catch (error) {
    console.log(error);
  }
};

// TEMPLATE ENGINE

app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
//ROUTES
app.get('/', photoController.getPhotos);

app.get('/photo/:id', photoController.getPhoto);

app.post('/photos', photoController.createPhoto);

app.put('/photos/:id', photoController.updatePhoto);

app.delete('/photos/:id', photoController.deletePhoto);

app.get('/photos/edit/:id', pageController.getEditPage);

app.get('/about', pageController.getAboutPage);

app.get('/add', pageController.getAddPage);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is up');
  connect();
});
