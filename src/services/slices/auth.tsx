import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authUrl, resetUrl } from '../../utils/constants'
import { getCookie, setCookie, deleteCookie } from '../../utils/cookies';

export const initialState = {
  auth: false,
  loading: false,
  error: '',
  userData: {},
  // Register state
  requestingRegisterSuccess: false,
  // ForgotPassword state
  requestingForgotPasswordSuccess: false,
  // ResetPassword state
  requestingResetPasswordSuccess: false,
  // Login state
  requestigLoginSuccess: false,
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
    },
    resetRequestingLogin: state => { 
      state.requestigLoginSuccess = false
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
        state.userData = payload.user
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
      .addCase(loginRequest.pending, state => { state.loading = true })
      .addCase(loginRequest.fulfilled, (state, { payload }) => {
        state.loading = false
        state.requestigLoginSuccess = true
        state.auth = true
        state.userData = payload.user
        state.error = `Проблема со входом в аккаунт: ${payload.message}`
        setCookie('accessToken', payload.accessToken, {expires: 20 * 60});
        setCookie('refreshToken', payload.refreshToken)
      })
      .addCase(loginRequest.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема со входом в аккаунт: ${payload}`
      })
    // Logout
      .addCase(logoutRequest.pending, state => { state.loading = true })
      .addCase(logoutRequest.fulfilled, (state, { payload }) => {
        state.loading = false
        state.auth = false
        state.userData = {}
        state.error = `Ошибка: ${payload.message}`
        deleteCookie('accessToken');
        deleteCookie('refreshToken')
      })
      .addCase(logoutRequest.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Ошибка: ${payload}`
      })
    // Get Token
      .addCase(getToken.pending, state => { state.loading = true })
      .addCase(getToken.fulfilled, (_, { payload }) => {
        setCookie('accessToken', payload.accessToken, {expires: 20 * 60})
        setCookie('refreshToken', payload.refreshToken)
      })
      .addCase(getToken.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Ошибка: ${payload}`
      })
  }
})

export const { 
  resetError,
  resetRequestingResetPassword,
  resetRequestingForgotPassword,
  resetRequestingRegister,
  resetRequestingLogin
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

export const loginRequest = createAsyncThunk(
  'auth/login',
  // @ts-ignore
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(authUrl + 'login', {
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

export const logoutRequest = createAsyncThunk(
  'auth/logoutRequest',
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(authUrl + 'logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({token: getCookie('refreshToken')})
      })
      const actualData = await res.json()
      return actualData
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const getToken = createAsyncThunk(
  'auth/getToken',
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(authUrl + 'token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({token: getCookie('refreshToken')})
      })
      const actualData = await res.json()
      return actualData
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)