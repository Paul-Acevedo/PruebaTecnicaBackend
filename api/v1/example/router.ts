import { Router } from 'express';
import { validateLoginSchema, validateSegurosSchema } from './helpers/schemas';
import { exampleController } from './controller/user';
import { segurosController } from './controller/seguros';

const router = Router();

const ruta = '/example';

router.post(
  ruta+'/login',
  /*Aqui va el middleware */ async function (req, res) {
    const values = await validateLoginSchema.parseAsync(req.body);

    const response = await exampleController(values);

    return res.status(response.statusCode).json(response);
  }
);

router.post(
  ruta+'/comparaSeguros',
  /*Aqui va el middleware */ async function (req, res) {
    const values = await validateSegurosSchema.parseAsync(req.body);

    const response = await segurosController(values);

    return res.status(response.statusCode).json(response);
  }
);

export default router;
