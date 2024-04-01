import { configureStore } from '@reduxjs/toolkit'
import Slice from './Slice'
export default  store = configureStore({
    reducer: Slice.reducer
  })