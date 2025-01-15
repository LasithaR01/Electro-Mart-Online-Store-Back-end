let Mysqli = require('mysqli');

// Create a new Mysqli connection instance
let conn = new Mysqli({
  host: 'localhost', // IP/domain
  port: 3307, // Port, default is 3306
  user: 'root', // Username
  passwd: '78563', // Password
  charset: 'utf8', // CHARSET of the database, optional
  db: 'electromartdb' // The default database name, optional
});

// Emit a connection to the specified database
let db = conn.emit(false, 'electromartdb');

const executeQuery = async (query, params = []) => {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

module.exports = {
  database: {
    executeQuery,
  },
};