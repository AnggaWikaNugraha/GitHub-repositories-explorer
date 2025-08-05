import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserUIState {
  expandedUsers: Record<string, boolean>;
}

const initialState: UserUIState = {
  expandedUsers: {},
};

const userUISlice = createSlice({
  name: "userUI",
  initialState,
  reducers: {
    toggleExpanded: (state, action: PayloadAction<string>) => {
      const username = action.payload;
      state.expandedUsers[username] = !state.expandedUsers[username];
    },
  },
});

export const { toggleExpanded } = userUISlice.actions;
export default userUISlice.reducer;