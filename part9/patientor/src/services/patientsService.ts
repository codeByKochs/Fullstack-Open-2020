import patients from '../../data/patients.json';
import { NonSensitivePatient, Patient, NewPatient } from '../types';

const getNonSensitiveEntries = () : Array<NonSensitivePatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getEntries = () : Array<Patient> => {
    return patients;
};

const addPatient = (toBeAdded : NewPatient) : Patient => {
    const newPatient = {
        id: (Math.floor(Math.random() * Math.floor(100000)).toString()),
        ...toBeAdded
    };
    
    return newPatient;
};

export default {getEntries, getNonSensitiveEntries, addPatient};