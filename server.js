import dotenv from 'dotenv';
dotenv.config();

// Importamos app directamente desde la carpeta src
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo con éxito en http://localhost:${PORT}`);
});