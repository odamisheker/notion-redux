export const selectUserId = (state) => state.user.data?.id;
export const selectLoading = (state) => state.user.loading;
export const selectUserEmail = (state) => state.user.data?.email;
export const selectUserError = (state) => state.user?.error;