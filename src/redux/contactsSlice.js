import { nanoid } from 'nanoid';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const { createSlice } = require('@reduxjs/toolkit');

const contactsInitialState = { values: [] };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.values.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            name,
            number,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.values.findIndex(
        item => item.name === action.payload
      );
      state.values.splice(index, 1);
    },
  },
});

const persistContactsConfig = {
  key: 'contacts',
  storage,
};

export const persistedContactsReducer = persistReducer(
  persistContactsConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;
