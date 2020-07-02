import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_request, _response) => {
    _response.send(diagnoseService.getEntries());
});

export default router;