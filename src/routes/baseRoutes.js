import express from 'express';
import path from 'path';


const router = express.Router();

// Define a simple route
router.get('/', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/index.html'));
});

router.get('/explore', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/explore.html'));
});

router.get('/profile', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/profile.html'));
});

router.get('/help', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/help.html'));
});

router.get('/account', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/account.html'));
});

router.get('/inbox', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/inbox.html'));
});

router.get('/library', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/library.html'));
});

router.get('/create', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/create.html'));
});

router.get('/messages', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/messages.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/new_account.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.resolve('src/public/templates/sign_in.html'));
});


export default router;