import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/recipes.routes.js';
import authRouter from './routes/auth.routes.js';


const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', router);
app.use('/api/auth', authRouter);


app.get("/", (req, res) => {
    res.send("api is running");
});




// Database connection
mongoose.connect(" Your LIink ")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
