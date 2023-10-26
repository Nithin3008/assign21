import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wards: [],
  status: "idle",
  error: null,
};

export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  const response = await axios.get(
    "https://assign21.nithinrocky30.repl.co/wards"
  );
  return response.data.wards;
});

export const addWard = createAsyncThunk(
  "wards/addWard",
  async (newWardData) => {
    const response = await axios.post(
      "https://assign21.nithinrocky30.repl.co/wards",
      newWardData
    );
    return response.data.addedWard;
  }
);

export const updateWard = createAsyncThunk(
  "wards/updateWard",
  async (updatedWardData) => {
    const response = await axios.post(
      `https://assign21.nithinrocky30.repl.co/wards/${updatedWardData._id}`,
      updatedWardData
    );
    return response.data.updatedWard;
  }
);

export const deleteWard = createAsyncThunk(
  "wards/deleteWard",
  async (wardId) => {
    const response = await axios.delete(
      `https://assign21.nithinrocky30.repl.co/wards/${wardId}`
    );
    return response.data.deletedWard;
  }
);

export const wardsSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWards.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWards.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [fetchWards.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addWard.pending]: (state) => {
      state.status = "loading";
    },
    [addWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards.push(action.payload);
    },
    [addWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateWard.pending]: (state) => {
      state.status = "loading";
    },
    [updateWard.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedWard = action.payload;
      const index = state.wards.findIndex(
        (ward) => ward._id === updatedWard._id
      );
      if (index !== -1) {
        state.wards[index] = updatedWard;
      }
    },
    [updateWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWard.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = state.wards.filter(
        (ward) => ward._id !== action.payload._id
      );
    },
    [deleteWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default wardsSlice.reducer;
