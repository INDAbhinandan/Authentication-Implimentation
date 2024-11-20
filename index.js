
import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

/* connect with Router */
// ROUTERS
app.use('/api/v1/auth/', authRoute)

// calldatabase connection function
connectDB();

/* Create a server */
const PORT = process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('World!');
})
