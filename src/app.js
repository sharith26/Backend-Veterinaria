import express from 'express';
import cors from 'cors';

import citaRoutes from './routes/cita.routes.js';
import detalleFacturaRoutes from './routes/detalle_factura.routes.js';
import especieRoutes from './routes/especie.routes.js';
import facturaRoutes from './routes/factura.routes.js';
import historiaClinicaRoutes from './routes/historia_clinica.routes.js';
import mascotaRoutes from './routes/mascota.routes.js';
import medicamentoRoutes from './routes/medicamento.routes.js';
import prescripcionRoutes from './routes/prescripcion.routes.js';
import propietarioRoutes from './routes/propietario.routes.js';
import razaRoutes from './routes/raza.routes.js';
import rolRoutes from './routes/rol.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import veterinarioRoutes from './routes/veterinario.routes.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/cita', citaRoutes);
app.use('/api/citas', citaRoutes);

app.use('/api/detalle-factura', detalleFacturaRoutes);
app.use('/api/detalles-facturas', detalleFacturaRoutes);

app.use('/api/especie', especieRoutes);
app.use('/api/especies', especieRoutes);

app.use('/api/factura', facturaRoutes);
app.use('/api/facturas', facturaRoutes);

app.use('/api/historia-clinica', historiaClinicaRoutes);
app.use('/api/historias-clinicas', historiaClinicaRoutes);

app.use('/api/mascota', mascotaRoutes);
app.use('/api/mascotas', mascotaRoutes);

app.use('/api/medicamento', medicamentoRoutes);
app.use('/api/medicamentos', medicamentoRoutes);

app.use('/api/prescripcion', prescripcionRoutes);
app.use('/api/prescripciones', prescripcionRoutes);

app.use('/api/propietario', propietarioRoutes);
app.use('/api/propietarios', propietarioRoutes);

app.use('/api/raza', razaRoutes);
app.use('/api/razas', razaRoutes);

app.use('/api/rol', rolRoutes);
app.use('/api/roles', rolRoutes);

app.use('/api/usuario', usuarioRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.use('/api/veterinario', veterinarioRoutes);
app.use('/api/veterinarios', veterinarioRoutes);

export default app;