const { createSlice } = require('@reduxjs/toolkit');

const filterInitialState = {
  value: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setValueFilter(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setValueFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;