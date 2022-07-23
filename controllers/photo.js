const Photo = require('../models/Photo');
const fs = require('fs');

exports.getPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 3;

  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find()
    .sort('-createdAt')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);

  res.render('index', {
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });
};

exports.getPhoto = async (req, res) => {
  const photos = await Photo.findById(req.params.id);
  res.render('photo', { photos });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  photo.title = req.body.title;
  photo.descripton = req.body.descripton;
  photo.save();
  res.redirect(`/photo/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
