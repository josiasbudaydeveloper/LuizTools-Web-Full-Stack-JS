import app from './app';
import database from "ms-commons/data/db";

(async () => {
  try {
    await database.sync({ alter: true });
    console.log('Connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  try {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  }
  catch(error) {
    console.log(error);
  }
})();