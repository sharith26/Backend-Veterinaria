import { Router } from 'express';
import { 
    obtenerUsuarios, 
    obtenerUsuarioPorId, 
    crearUsuario, 
    actualizarUsuario, 
    eliminarUsuario,
    login 
} from '../controllers/usuario.controllers.js';
import { protegerRuta, verificarRol } from '../config/middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/', crearUsuario);

router.get('/', protegerRuta, verificarRol(['Consultas']), obtenerUsuarios);
router.get('/:id', protegerRuta, verificarRol(['Consultas']), obtenerUsuarioPorId);

router.post('/', protegerRuta, verificarRol([]), crearUsuario);
router.put('/:id', protegerRuta, verificarRol([]), actualizarUsuario);
router.delete('/:id', protegerRuta, verificarRol([]), eliminarUsuario);

export default router;