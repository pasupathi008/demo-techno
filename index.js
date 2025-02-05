const express = require('express');
const { Pool } = require('pg');

const app = express();

// Database Connection
const pool = new Pool({
  user: 'postgres',
  host: 'database-demo.c9kvlfqif68u.us-east-1.rds.amazonaws.com', // e.g., localhost or AWS RDS endpoint
//  database: 'database-demo',
  password: 'postgres123',
  port: 5432, // Default PostgreSQL port
});

// Test DB Connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch(err => console.error("Database connection error ❌", err.stack));

app.get('/siq', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Get current timestamp
    res.send(`Database Connected: ${result.rows[0].now}/siq',);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});
app.get('/faq', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM gc_faq'); // Query to fetch data from 'users' table
      const users = result.rows; // Get rows from result
  
      // Render the table as HTML
      let html = '<table border="1"><thead><tr><th>ID</th><th>Name</th><th>Email</th></tr></thead><tbody>';
      users.forEach(user => {
        html += `<tr><td>${user.id}</td><td>${user.question}</td><td>${user.answer}</td></tr>`;
      });
      html += '</tbody></table>';
  
      res.send(html); // Send the table as HTML to the browser
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).send('Error fetching data');
    }
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
