import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { LoginRespone } from '../Interfaces/auth.nteraface';
import { PREFIX } from '../helpers/API';

export const JWT_PERSISTENT_STATE = 'userData';
export interface UserState {
    jwt: string | null;
    loginState?: string;
    registerErrorMessage?: string;
}

export interface UserPersistentState {
    jwt: string | null;
}

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk('user/login', 
	async (params: {email: string, password: string}) => {
		try {
			const {data} = await axios.post<LoginRespone>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message);
			}
		}
	}
);

export const register = createAsyncThunk('user/register', 
	async (params: {email: string, password: string, name: string}) => {
		try {
			const {data} = await axios.post<LoginRespone>(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password,
				name: params.name
			});
			return data;
		} catch(err) {
			if(err instanceof AxiosError) {
				throw new Error(err.response?.data.message);
			}
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginState = undefined;
		},
		clearRegisterError: (state) => { 
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action:PayloadAction<LoginRespone>) => {
			if(!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, error) => {
			state.loginState = error.error.message;
		});

		builder.addCase(register.fulfilled, (state, action:PayloadAction<LoginRespone>) => {
			if(!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, error) => {
			state.registerErrorMessage = error.error.message;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;