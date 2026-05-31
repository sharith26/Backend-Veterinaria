import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';

const PORT = process.env.PORT || 3000;
const cors = require('cors');
// Esto permite que tu Angular (4200) hable con tu Node (3000)
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo con éxito en http://localhost:${PORT}`);
});