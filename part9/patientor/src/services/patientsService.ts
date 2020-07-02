import patients from '../../data/patients.json';
import { NonSensitivePatient, Patient } from '../types';


const getNonSensitiveEntries = () : Array<NonSensitivePatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getEntries = () : Array<Patient> => {
    return patients;
};

export default {getEntries, getNonSensitiveEntries};