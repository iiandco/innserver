const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require("./app/models");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());


// маршруты
require("./app/routes/companys.routes")(app);


(async () => {
  try {
    //==================Синхронизация//==================
    // await sequelize.authenticate();
    // console.log('Connected to the database.');

    ////==================Сбросить и записать данные//==================
    await db.sequelize.sync({ force: true }).then(() => {});
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







