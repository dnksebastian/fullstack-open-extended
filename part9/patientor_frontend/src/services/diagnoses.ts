import axios from "axios";

import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAllDiagnoses = async () => {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

    return data;
};

const getSingleDiagnose = async (id: string) => {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    
    const matchingDiagnosis = data.filter(d => d.code === id);
    
    return matchingDiagnosis
};

const diagnosesServices = {
    getAllDiagnoses,
    getSingleDiagnose,
}


export default diagnosesServices