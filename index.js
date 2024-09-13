require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

async function getRandomImage() {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

function generatePassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

app.get('/', async (req, res) => {
  const password = generatePassword();
  const imageUrl = await getRandomImage();
  res.render('index', { password, imageUrl });
});

app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});