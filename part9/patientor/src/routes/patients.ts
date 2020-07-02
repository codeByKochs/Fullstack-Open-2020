import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_request, _response) => {
    _response.send(patientsService.getNonSensitiveEntries());
});

export default router;