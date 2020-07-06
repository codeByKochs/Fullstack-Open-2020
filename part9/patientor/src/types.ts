export interface Diagnose {
    code: string,
    name: string,
    latin: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender:Gender,
    occupation: string
}

export interface NonSensitivePatient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender:Gender,
    occupation: string
}

export interface NewPatient {
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender:Gender,
    occupation: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}