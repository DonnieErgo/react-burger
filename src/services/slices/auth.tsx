import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authUrl, resetUrl } from '../../utils/constants'
import { getCookie, setCookie, deleteCookie } from '../../utils/cookies';

export const initialState = {
  auth: false,
  acessToken: null,
  refreshToken: null,
  loading: false,
  error: '',
  userData: {},
  // Register state
  requestingRegisterSuccess: false,
  // ForgotPassword state
  requestingForgotPasswordSuccess: false,
  // ResetPassword state
  requestingResetPasswordSuccess: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: state => { state.error = '' },
    resetRequestingResetPassword: state => { 
      state.requestingResetPasswordSuccess = false
    },
    resetRequestingForgotPassword: state => { 
      state.requestingForgotPasswordSuccess = false
    },
    resetRequestingRegister: state => { 
      state.requestingRegisterSuccess = false
    }
  },
  extraReducers: builder => {
    builder
    // Register
      .addCase(registerUser.pending, state => { state.loading = true })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с регистрацией: ${payload.message}`
        state.auth = true
        state.requestingRegisterSuccess = true
        setCookie('accessToken', payload.accessToken, {expires: 20 * 60});
        setCookie('refreshToken', payload.refreshToken)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с регистрацией: ${payload}`
      })
    // ForgotPassword
      .addCase(forgotPassword.pending, state => { state.loading = true })
      .addCase(forgotPassword.fulfilled, state => {
        state.loading = false
        state.requestingForgotPasswordSuccess = true
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с отправкой кода: ${payload}`
      })
    // ResetPassword
      .addCase(resetPassword.pending, state => { state.loading = true })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.loading = false
        state.requestingResetPasswordSuccess = true
        state.error = `Проблема с обновлением пароля: ${payload.message}`
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с обновлением пароля: ${payload}`
      })
    // Login
    .addCase(login.pending, state => { state.loading = true })
    .addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false
      state.requestingResetPasswordSuccess = true
      state.error = `Проблема со входом в аккаунт: ${payload.message}`
    })
    .addCase(login.rejected, (state, { payload }) => {
      state.loading = false
      state.error = `Проблема со входом в аккаунт: ${payload}`
    })
  }
})

export const { 
  resetError,
  resetRequestingResetPassword,
  resetRequestingForgotPassword,
  resetRequestingRegister
} = authSlice.actions

export const authSelector = state => state.auth
export const authReducer = authSlice.reducer

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(authUrl + 'register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      })
      const actualData = await res.json()
      return actualData
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  // @ts-ignore
  async (email, { rejectWithValue }) => {
    try {
      const res = await fetch(resetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({'email': email})
      })
      const actualData = await res.json()
      return actualData
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  // @ts-ignore
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(resetUrl + 'reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      })
      const actualData = await res.json()
      return actualData
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  // @ts-ignore
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(resetUrl + 'reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      })
      const actualData = await res.json()
      return actualData
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)