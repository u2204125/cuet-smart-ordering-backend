const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Backend server URL: http://${HOST}:${PORT}`);
});
