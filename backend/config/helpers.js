const mysql = require('mysql2/promise');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',       // MySQL Host (your machine for local dev)
  port: 3307,              // MySQL Port (same as Workbench config)
  user: 'root',            // MySQL Username
  password: '78563',       // MySQL Password
  database: 'electromartdb', // MySQL Database Name
  waitForConnections: true,
  connectionLimit: 10,      // Connection pool size
  queueLimit: 0,
});

// Function to execute queries
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
