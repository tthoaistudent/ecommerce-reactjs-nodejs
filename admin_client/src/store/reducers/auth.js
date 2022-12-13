import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import in project
import adminAuth from 'apis/auth';

const initialState = {
    currentUser: {},
    isLoggedIn: Boolean(localStorage.getItem('isLogged')) || false,
    accessToken: localStorage.getItem('accessToken') || null
};

const saveLocalStorage = (state) => {
    localStorage.setItem('isLogged', state.isLoggedIn || false);
    localStorage.setItem('accessToken', state.accessToken || null);
};

const detroyLocalStore = () => {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('accessToken');
};

export const login = createAsyncThunk('auth/login', async ({ phone, password }, thunkApi) => {
    return adminAuth
        .login(phone, password)
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return thunkApi.rejectWithValue(e.response.message);
        });
});

export const getCurrentUser = createAsyncThunk('auth/getCurrent', async (thunkApi) => {
    return adminAuth
        .getCurrentUser()
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return thunkApi.rejectWithValue(error.response.message);
        });
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            const newState = { ...state };
            newState.isLoggedIn = false;
            newState.currentUser = null;
            newState.accessToken = null;
            detroyLocalStore();

            return newState;
        }
    },
    extraReducers: {
        [login.rejected]: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.currentUser = action.payload.user;
            state.accessToken = action.payload.token;
            saveLocalStorage(state);
        },
        [getCurrentUser.rejected]: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        [getCurrentUser.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            saveLocalStorage(state);
        }
    }
});
const { reducer } = authSlice;
export const { logout } = authSlice.actions;
export default reducer;
