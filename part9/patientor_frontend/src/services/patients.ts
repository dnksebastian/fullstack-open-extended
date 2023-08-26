import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getSinglePatient = async (id: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);
  return data
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (id:string, obj: object) => {

  const { data } = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, obj);
  console.log(data);
  
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, getSinglePatient, create, addEntry
};

