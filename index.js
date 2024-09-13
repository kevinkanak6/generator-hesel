const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

function generatePassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

app.get('/', (req, res) => {
  res.render('index', { password: generatePassword() });
});

app.get('/generate', (req, res) => {
  const length = parseInt(req.query.length) || 12;
  res.json({ password: generatePassword(length) });
});

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
  });