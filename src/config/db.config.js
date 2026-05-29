import mysql2 from 'mysql2/promise';
import { db_config } from './environment.js';
import { logger } from '../middleware/logger.middleware.js';

export const db = mysql2.createPool({
   host: db_config.host,
   port: db_config.port,
   user: db_config.user,
   password: db_config.password,
   database: db_config.database,
   waitForConnections: true,
   connectionLimit: db_config.connectionLimit,
   queueLimit: 0,
   ssl: {
      rejectUnauthorized: false
   }
});

export const checkConnection = async () => {
   try {
      const connection = await db.getConnection();
      logger.info("DB Connection Successful.");
      console.log("DB Connection Successful.");
      connection.release();
   } catch (err) {
      logger.error("Error occurred while connecting with DB.");
      console.error(err);
      throw err;
   }
};