const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'kubernetes/' });

app.use(express.static('website'));

app.post('/upload', upload.single('yamlFile'), (req, res) => {
  const filePath = path.join(__dirname, 'kubernetes', req.file.originalname);
  fs.renameSync(req.file.path, filePath);
  res.send('YAML file uploaded and saved to Kubernetes folder!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
