import { createSlice } from "@reduxjs/toolkit";

const FilterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter: (_, {payload}) => payload
    }
})
export const { setFilter } = FilterSlice.actions

export default FilterSlice.reducer
