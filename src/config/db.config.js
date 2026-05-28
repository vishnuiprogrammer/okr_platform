import mysql2 from 'mysql2/promise';
import { db_config } from './environment.js';
import { logger } from '../middleware/logger.middleware.js';

export const db = mysql2.createPool({
   host: db_config.host,
   user: db_config.user,
   password: db_config.password,
   database: db_config.database,
   waitForConnections: true,
   connectionLimit: parseInt(db_config.db_connectionLimit),
   queueLimit: 0
});

const checkConnection = () => {
   db.getConnection((err, connection) => {
      if (err) {
         logger.error("Error occurred while connecting with DB.");
         throw err;
      }
      logger.info("DB Connection Successful..")
      console.log("DB Connection Successful..");
   });
}