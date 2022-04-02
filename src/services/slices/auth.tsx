import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authUrl, resetUrl } from '../../utils/constants'
import { getCookie, setCookie, deleteCookie } from '../../utils/cookies';

export const initialState = {
  auth: false,
  loading: false,
  error: '',
  userData: {
    email: '',
    password: '',
    name: '',
  },
  // Стейты запросов для редиректов
  forgotPassRequestSuccess: false,
  resetPassRequestSuccess: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: state => { getCookie('refreshToken') ? getToken() : state.auth = false },
    resetError: state => { state.error = '' },
    resetForgotPassRequestSuccess: state => { state.forgotPassRequestSuccess = false },
    resetResetPassRequestSuccess: state => { state.resetPassRequestSuccess = false },
  },
  extraReducers: builder => {
    builder
    // Register
      .addCase(registerUser.pending, state => { state.loading = true })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с регистрацией: ${payload.message}`
        payload.success ? state.auth = true : state.auth = false
        payload.success ? state.userData.name = payload.user.name : state.userData.name = ''
        payload.success ? state.userData.email = payload.user.email : state.userData.email = ''
        payload.success ? state.userData.password = '' : state.userData.password = ''
        setCookie('accessToken', payload.accessToken, {expires: 20 * 60});
        setCookie('refreshToken', payload.refreshToken)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с регистрацией: ${payload}`
      })
    // ForgotPassword
      .addCase(forgotPassword.pending, state => { state.loading = true })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false
        payload.success ? state.forgotPassRequestSuccess = true : state.forgotPassRequestSuccess = false
        !payload.success ? state.error = `Проблема с отправкой кода: ${payload.message}` : state.error = ''
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с отправкой кода: ${payload}`
      })
    // ResetPassword
      .addCase(resetPassword.pending, state => { state.loading = true })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.loading = false
        payload.success ? state.resetPassRequestSuccess = true : state.resetPassRequestSuccess = false
        !payload.success ? state.error = `Проблема с обновлением пароля: ${payload.message}` : state.error = ''
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с обновлением пароля: ${payload}`
      })
    // Login
      .addCase(loginRequest.pending, state => { state.loading = true })
      .addCase(loginRequest.fulfilled, (state, { payload }) => {
        state.loading = false
        payload.success ? state.auth = true : state.auth = false
        !payload.success ? state.error = `Проблема со входом в аккаунт: ${payload.message}` : state.error = ''
        payload.success ? state.userData.name = payload.user.name : state.userData.name = ''
        payload.success ? state.userData.email = payload.user.email : state.userData.email = ''
        payload.success ? state.userData.password = '' : state.userData.password = ''
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
        state.userData.name = ''
        state.userData.email = ''
        state.userData.password = ''
        state.error = `Ошибка: ${payload.message}`
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
      })
      .addCase(logoutRequest.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Ошибка: ${payload}`
      })
    // Get User
      .addCase(getUser.pending, state => { state.loading = true })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        payload.success ? state.userData.name = payload.user.name : state.userData.name = ''
        payload.success ? state.userData.email = payload.user.email : state.userData.email = ''
        payload.success ? state.userData.password = '' : state.userData.password = ''
        payload.success ? state.auth = true : state.auth = false
        !payload.success ? state.error = `Проблема с получением данных пользователя: ${payload.message}` : state.error = ''
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Ошибка: ${payload}`
      })
    // Update User
      .addCase(updateUser.pending, state => { state.loading = true })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        payload.success ? state.userData.name = payload.user.name : state.userData.name = ''
        payload.success ? state.userData.email = payload.user.email : state.userData.email = ''
        payload.success ? state.userData.password = '' : state.userData.password = ''
        payload.success ? state.auth = true : state.auth = false
        !payload.success ? state.error = `Проблема с обновлением данных пользователя: ${payload.message}` : state.error = ''
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Ошибка: ${payload}`
      })
    // Get Token
      .addCase(getToken.pending, state => { state.loading = true })
      .addCase(getToken.fulfilled, (state, { payload }) => {
        setCookie('accessToken', payload.accessToken, {expires: 20 * 60})
        setCookie('refreshToken', payload.refreshToken)
        payload.success ? state.auth = true : state.auth = false
      })
      .addCase(getToken.rejected, (state, { payload }) => {
        state.auth = false
        state.loading = false
        state.error = `Ошибка: ${payload}`
      })
  }
})

export const { 
  checkAuth,
  resetError,
  resetForgotPassRequestSuccess,
  resetResetPassRequestSuccess
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
        body: JSON.stringify({'token': getCookie('refreshToken')})
      })
      const actualData = await res.json()
      return actualData
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const getUser = createAsyncThunk(
  'auth/getUser',
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      if (getCookie('accessToken')) {
        const res = await fetch(authUrl + 'user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': getCookie('accessToken')}
        })
        const actualData = await res.json()
        return actualData
      } else {
        getToken()
        getUser()
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  // @ts-ignore
  async (form, { rejectWithValue }) => {
    try {
      if (getCookie('accessToken')) {
        const res = await fetch(authUrl + 'user', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'authorization': getCookie('accessToken')},
          body: JSON.stringify(form)
        })
        const actualData = await res.json()
        return actualData
      } else {
        getToken()
        getUser()
      }
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
        body: JSON.stringify({'token': getCookie('refreshToken')})
      })
      const actualData = await res.json()
      return actualData
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)