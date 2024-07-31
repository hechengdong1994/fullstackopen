import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload && action.payload !== '' ? action.payload : null
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer