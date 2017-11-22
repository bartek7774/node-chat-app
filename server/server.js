const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 5000;

const app = new express();
app.use(express.static(publicPath));


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port.`);
});