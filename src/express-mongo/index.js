const express = require('express');
const router = require('./router');
const connection = require('./models-mongo/mongo');

const app = express();
const cors = require('cors');

const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

(async function () {
  try {
    await connection;
    console.log('DB Connected 👍');
    app.listen(PORT, () => {
      console.log(`running on http://localhost:${PORT} 🚀`);
    });
  } catch (err) {
    console.error(err);
  }
})();
