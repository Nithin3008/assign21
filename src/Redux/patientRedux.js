import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(
      "https://assign21.nithinrocky30.repl.co/patients"
    );
    return response.data.patients;
  }
);

export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (newPatientData) => {
    const response = await axios.post(
      "https://assign21.nithinrocky30.repl.co/patients",
      newPatientData
    );
    return response.data.addedPatient;
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (updatedPatientData) => {
    const response = await axios.post(
      `https://assign21.nithinrocky30.repl.co/patients/${updatedPatientData._id}`,
      updatedPatientData
    );
    return response.data.updatedPatient;
  }
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (patientId) => {
    const response = await axios.delete(
      `https://assign21.nithinrocky30.repl.co/patients/${patientId}`
    );
    return response.data.deletedPatient;
  }
);

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = action.payload;
    },
    [fetchPatients.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addPatient.pending]: (state) => {
      state.status = "loading";
    },
    [addPatient.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients.push(action.payload);
    },
    [addPatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updatePatient.pending]: (state) => {
      state.status = "loading";
    },
    [updatePatient.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedPatient = action.payload;
      const index = state.patients.findIndex(
        (patient) => patient._id === updatedPatient._id
      );
      if (index !== -1) {
        state.patients[index] = updatedPatient;
      }
    },
    [updatePatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePatient.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatient.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload._id
      );
    },
    [deletePatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default patientsSlice.reducer;
