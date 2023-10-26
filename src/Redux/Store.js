import { configureStore } from "@reduxjs/toolkit";
import patientsSlice from "./patientRedux";
import wardsSlice from "./wardPatientRedux";

const store = configureStore({
  reducer: {
    patients: patientsSlice,
    wards: wardsSlice,
  },
});

export default store;
