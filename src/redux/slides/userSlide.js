import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     name: '',
    email:'',
    phone:'',
    address:'',
    avatar:'',
    access_token:'',
    id:'',
    isAdmin:false
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
        const {name='', email='', access_token='',avatar='', phone='', address='',_id='',id ='', isAdmin} = action.payload
        state.name = name || state.name
        state.email = email || state.email
        state.avatar = avatar || state.avatar
        state.phone = phone || state.phone
        state.address = address || state.address
        state.id = _id || id || state.id 
        state.access_token = access_token 
        state.isAdmin= isAdmin
  },
    resetUser: (state) => {
        state.name =''
        state.email = ''
        state.address = ''
        state.phone = ''
        state.avatar = ''
        state.id = ''
        state.access_token = ''
        state.isAdmin = false
  },
}})

export const { updateUser,resetUser } = userSlide.actions

export default userSlide.reducer