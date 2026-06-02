import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';

const PORT = process.env.PORT || 3000;
import cors from 'cors';
import express from 'express';
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo con éxito en http://localhost:${PORT}`);
});