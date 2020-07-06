import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_request, _response) => {
    _response.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (_request, _response) => {
try {
    const newPatient = toNewPatient(_request.body);
    const addedPatient = patientsService.addPatient(newPatient);
    _response.json(addedPatient);
} catch (e) {
    _response.status(400).send(e.message);
}
});

export default router;