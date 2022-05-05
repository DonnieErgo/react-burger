import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../utils/constants'
import { TRootState } from '../rootReducer'
import { getCookie, setCookie, deleteCookie } from '../../utils/cookies'
import { TUser, TLoginData, TResetPasswordData, TRegisterData } from '../../utils/types'
import { customFetch } from '../../utils/utils'

type TAuthState = {
  auth: boolean,
  loading: boolean,
  error: string,
  userData: {
    email: string,
    password: string,
    name: string,
  },
  forgotPassRequestSuccess: boolean,
  resetPassRequestSuccess: boolean,
};

const initialState = {
  auth: !!getCookie('accessToken'),
  loading: false,
  error: '',
  userData: {
    email: '',
    password: '',
    name: '',
  },
  forgotPassRequestSuccess: false,
  resetPassRequestSuccess: false,
} as TAuthState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: state => { getCookie('refreshToken') ? getUser() : state.auth = false },
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
        state.auth = true
        state.userData.name = payload.user.name
        state.userData.email = payload.user.email
        state.userData.password = ''
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
        state.forgotPassRequestSuccess = true
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с отправкой кода: ${payload}`
      })
    // ResetPassword
      .addCase(resetPassword.pending, state => { state.loading = true })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = false
        state.resetPassRequestSuccess = true
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с обновлением пароля: ${payload}`
      })
    // Login
      .addCase(loginRequest.pending, state => { state.loading = true })
      .addCase(loginRequest.fulfilled, (state, { payload }) => {
        state.loading = false
        state.auth = true
        state.userData.name = payload.user.name
        state.userData.email = payload.user.email
        state.userData.password = ''
        setCookie('accessToken', payload.accessToken, {expires: 20 * 60});
        setCookie('refreshToken', payload.refreshToken)
      })
      .addCase(loginRequest.rejected, (state, { payload }) => {
        state.auth = false
        state.loading = false
        state.error = `Проблема со входом в аккаунт: ${payload}`
      })
    // Logout
      .addCase(logoutRequest.pending, state => { 
        state.loading = true
      })
      .addCase(logoutRequest.fulfilled, state => {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        state.loading = false
        state.auth = false
        state.userData.name = ''
        state.userData.email = ''
        state.userData.password = ''
      })
      .addCase(logoutRequest.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Ошибка: ${payload}`
      })
    // Get User
      .addCase(getUser.pending, state => { state.loading = true })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.userData.name = payload.user.name
        state.userData.email = payload.user.email
        state.userData.password = ''
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.userData.name = ''
        state.userData.email = ''
        state.userData.password = ''
        state.loading = false
        state.error = `Проблема с получением данных пользователя: ${payload}`
        if (payload === 'jwt expired') getToken()
      })
    // Update User
      .addCase(updateUser.pending, state => { state.loading = true })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.userData.name = payload.user.name
        state.userData.email = payload.user.email
        state.userData.password = ''
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.userData.name = ''
        state.userData.email = ''
        state.userData.password = ''
        state.loading = false
        state.error = `Проблема с обновлением данных пользователя: ${payload}`
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
  checkAuth,
  resetError,
  resetForgotPassRequestSuccess,
  resetResetPassRequestSuccess
} = authSlice.actions

export const authSelector = (state: TRootState) => state.auth
export const authReducer = authSlice.reducer

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (form: TRegisterData, { rejectWithValue }) => {
    try { return await customFetch(`${baseUrl}auth/register`, 'POST', JSON.stringify(form)) }
    catch (err) { return rejectWithValue(err.message) }
  }
)

export const forgotPassword = createAsyncThunk('auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try { return await customFetch(`${baseUrl}password-reset`, 'POST', JSON.stringify(email)) }
    catch (err) { return rejectWithValue(err.message) }
  }
)

export const resetPassword = createAsyncThunk('auth/resetPassword',
  async (form: TResetPasswordData, { rejectWithValue }) => {
    try { return await customFetch(`${baseUrl}password-reset/reset`, 'POST', JSON.stringify(form)) }
    catch (err) { return rejectWithValue(err.message) }
  }
)

export const loginRequest = createAsyncThunk('auth/login',
  async (form: TLoginData, { rejectWithValue }) => {
    try { return await customFetch(`${baseUrl}auth/login`, 'POST', JSON.stringify(form)) }
    catch (err) { return rejectWithValue(err.message) }
  }
)

export const logoutRequest = createAsyncThunk('auth/logoutRequest',
  async (_, { rejectWithValue }) => {
    try { return await customFetch(
      `${baseUrl}auth/logout`, 'POST', 
      JSON.stringify({ 'token': getCookie('refreshToken') }))
    } catch (err) { return rejectWithValue(err.message) }
  }
)

export const getUser = createAsyncThunk('auth/getUser',
  async (_, { rejectWithValue }) => {
    try { return await customFetch(
      `${baseUrl}auth/user`, 'GET', null,
      {'Content-Type': 'application/json', 'authorization': getCookie('accessToken')})
    } catch (err) { return rejectWithValue(err.message) }
  }
)

export const updateUser = createAsyncThunk('auth/updateUser',
  async (form: TUser, { rejectWithValue }) => {
    try { return await customFetch(
      `${baseUrl}auth/user`, 'PATCH', JSON.stringify(form),
      {'Content-Type': 'application/json', 'authorization': getCookie('accessToken')})
    } catch (err) { return rejectWithValue(err.message) }
  }
)

export const getToken = createAsyncThunk('auth/getToken',
  async (_, { rejectWithValue }) => {
    try { return await customFetch(
      `${baseUrl}auth/token`, 'POST', 
      JSON.stringify({ 'token': getCookie('refreshToken') }))
    } catch (err) { return rejectWithValue(err.message) }
  }
)