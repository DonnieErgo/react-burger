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
  // requestingForgotPassword: false,
  // requestingResetPassword: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // resetRequestingResetPassword: state => { 
    //   state.requestingResetPassword = false
    // },
    // resetRequestingForgotPassword: state => { 
    //   state.requestingForgotPassword = false
    // },
  },
  extraReducers: builder => {
    builder
    // Register
      .addCase(registerUser.pending, state => { state.loading = true })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = ''
        state.auth = true
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
        // state.requestingForgotPassword = true
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с отправкой кода: ${payload}`
      })
    // ResetPassword
      .addCase(resetPassword.pending, state => { state.loading = true })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = false
        // state.requestingResetPassword = true
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с обновлением пароля: ${payload}`
      })
  }
})

export const { 
  // resetRequestingResetPassword,
  // resetRequestingForgotPassword
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