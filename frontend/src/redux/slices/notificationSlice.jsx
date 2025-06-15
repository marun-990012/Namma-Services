import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstancs';

// Fetch all notifications
export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications',async (_, {rejectWithValue}) => {
  
  try {
      const response = await axiosInstance.get("/notification/list/all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data.notifications;
    } catch (error) {
      return rejectWithValue(error.response?.data || "error while fetch notifications");
    }
  }
);

// Fetch unread count only
export const fetchUnreadCount = createAsyncThunk('notifications/fetchUnreadCount',async (_, {rejectWithValue}) => {

  try {
      const response = await axiosInstance.get("/notification/list/unread/count", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data.unreadCount;
    } catch (error) {
      return rejectWithValue(error.response?.data || "error while fetch count");
    }
  }
);

//mark as read
export const markNotificationsAsRead = createAsyncThunk('notifications/markNotificationsAsRead',async (_, {rejectWithValue}) => {
  console.log('slice')
  try {
      const response = await axiosInstance.put("/notification/read",{}, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "error while mark as read");
    }
  }
);




const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })

      .addCase(markNotificationsAsRead.fulfilled, (state,action) => {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        isRead: true,
      }));
      state.unreadCount = 0;
    });
  },
});

export default notificationSlice.reducer;
