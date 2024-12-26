"use client";
import api from "@/app/(Axios)/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  capsules: [],
  capsule: null,
  loading: false,
  error: null,
};

export const fetchCapsules = createAsyncThunk(
  "capsules/fetchCapsules",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/capsule/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch time capsules"
      );
    }
  }
);

export const fetchCapsuleById = createAsyncThunk(
  "capsules/fetchCapsuleById",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get(`/capsule/getCapsuleById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch time capsules"
      );
    }
  }
);

export const editCapsule = createAsyncThunk(
  "capsules/editCapsule",
  async (capsuleData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const { release_date, ...restData } = capsuleData;

      const payload = release_date
        ? { ...restData, release_date: new Date(release_date).toISOString() }
        : restData;

      const response = await api.patch(
        `/capsule/updateCapsule/${capsuleData._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update time capsule"
      );
    }
  }
);

export const createCapsule = createAsyncThunk(
  "capsules/createCapsule",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.post(`/capsule/createCapsule`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create time capsule"
      );
    }
  }
);

export const deleteCapsule = createAsyncThunk(
  "capsules/deleteCapsule",
  async (capsuleId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.delete(`/capsule/deleteCapsule/${capsuleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Time Capsule deleted Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      return capsuleId;
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response?.data?.message || "Failed to delete time capsule",
        showConfirmButton: false,
        timer: 1500,
      });
      return rejectWithValue(
        error.response?.data || "Failed to delete time capsule"
      );
    }
  }
);

export const fetchCapsuleByLink = createAsyncThunk(
  "capsules/fetchCapsuleByLink",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/capsule/getCapsuleByLink/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch time capsule"
      );
    }
  }
);

const capsulesSlice = createSlice({
  name: "capsules",
  initialState,
  reducers: {
    clearCapsules: (state) => {
      state.capsules = [];
    },
    clearSingleCapsule: (state) => {
      state.capsule = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Capsules Cases
    builder
      .addCase(fetchCapsules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCapsules.fulfilled, (state, action) => {
        state.loading = false;
        state.capsules = action.payload;
      })
      .addCase(fetchCapsules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Capsule by ID Cases
    builder
      .addCase(fetchCapsuleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCapsuleById.fulfilled, (state, action) => {
        state.loading = false;
        state.capsule = action.payload;
      })
      .addCase(fetchCapsuleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update a Capsule Cases
    builder
      .addCase(editCapsule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCapsule.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCapsule = action.payload;

        if (state.capsule && state.capsule._id === updatedCapsule._id) {
          state.capsule = updatedCapsule;
        }

        const index = state.capsules.findIndex(
          (c) => c._id === updatedCapsule._id
        );
        if (index !== -1) {
          state.capsules[index] = updatedCapsule;
        }
      })
      .addCase(editCapsule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create a Time Capsule Cases
    builder
      .addCase(createCapsule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCapsule.fulfilled, (state, action) => {
        state.loading = false;
        state.capsules.push(action.payload);
      })
      .addCase(createCapsule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Time Capsule Cases
    builder
      .addCase(deleteCapsule.fulfilled, (state, action) => {
        if (Array.isArray(state.capsules)) {
          state.capsules = state.capsules.filter(
            (capsule) => capsule._id !== action.payload
          );
        } else {
          state.capsule = null;
        }
      })
      .addCase(deleteCapsule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Capsule by Link Cases
    builder
      .addCase(fetchCapsuleByLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCapsuleByLink.fulfilled, (state, action) => {
        state.loading = false;
        state.capsule = action.payload;
      })
      .addCase(fetchCapsuleByLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearCapsules, clearSingleCapsule } = capsulesSlice.actions;
export default capsulesSlice;
