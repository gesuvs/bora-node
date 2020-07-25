import { Router } from 'express';
import { setup, serve } from 'swagger-ui-express';

import { swaggerDefinition } from './swaggerDefinition';

export const swagger = Router();
swagger.use('/api-docs', serve, setup(swaggerDefinition));
