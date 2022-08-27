import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchRegistration = createAsyncThunk(
	'registration/fetchRegistration',
	async params => {
		try {
			const { data } = await axios.post(
				'http://localhost:4000/register',
				params
			)
			alert('Регистрация прошла успешно')
			return data
		} catch (err) {
			console.log(err)
			alert(err.response.data.message)
		}
	}
)
export const fetchNewItem = createAsyncThunk(
	'posts/fetchNewItem',
	async params => {
		try {
			const { data } = await axios.post('http://localhost:4000/post', params)
			console.log(data)
			return data
		} catch (err) {
			alert(err.response.data.message)
		}
	}
)
export const fetchPost = createAsyncThunk('posts/fetchPosts', async params => {
	try {
		const { data } = await axios.get('http://localhost:4000/post', params)
		return data
	} catch (err) {
		alert(err.response.data.message)
	}
})
export const fetchLogin = createAsyncThunk(
	'login/fetchLogin',
	async (params, rejectWithValue) => {
		try {
			const { data } = await axios.post('http://localhost:4000/login', params)
			alert('Вы успешно авторизовались')
			return data
		} catch (err) {
			alert(err.response.data.message)
			return rejectWithValue(err)
		}
	}
)

const initialState = {
	posts: [],
	userLogin: { user: [], status: false },
	postItem: [],
	NewItem: [],
	oneItem: [],
	sortElem: 'name',
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setOne: (state, action) => {
			state.oneItem = action.payload
		},
		setOut: state => {
			state.userLogin = { user: [], status: false }
		},
		setSort: (state, active) => {
			state.sortElem = active.payload
		},
	},
	extraReducers: {
		[fetchRegistration.fulfilled]: (state, action) => {
			state.posts = action.payload
		},
		[fetchLogin.fulfilled]: (state, action) => {
			state.userLogin.user = action.payload
			state.userLogin.status = true
		},
		[fetchLogin.rejected]: state => {
			state.userLogin.user = []
			state.userLogin.status = false
		},
		[fetchNewItem.fulfilled]: (state, action) => {
			state.NewItem = action.payload
		},
		[fetchPost.fulfilled]: (state, action) => {
			state.postItem = action.payload.sort((a, b) => {
				let fa = a[state.sortElem],
					fb = b[state.sortElem]
				if (typeof fa === 'string') {
					fa = fa.toLowerCase()
					fb = fb.toLowerCase()
					if (fa < fb) {
						return -1
					}
					if (fa > fb) {
						return 1
					}
					return 0
				}else{
					fa = fa.length
					fb = fb.length
					if (fa < fb) {
						return -1
					}
					if (fa > fb) {
						return 1
					}
					return 0
				}
			})
		},
	},
})
export const { setOne, setOut, setSort } = postsSlice.actions
export const postsReducer = postsSlice.reducer
