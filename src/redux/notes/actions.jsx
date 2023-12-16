import { serverRequest } from "../../util/App";

export const getNotes = (authorId) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/LOADING" });
    const params = new URLSearchParams({ authorId }).toString();
    const notes = await serverRequest.getNotes(authorId);
    dispatch({ type: "NOTES/SET", payload: notes });
  } catch (err) {
    dispatch({ type: "NOTES/ERROR", payload: err.toString() });
  }
};

export const addNote = (newNote) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/LOADING" });
    await serverRequest.addNote(newNote);
    dispatch({ type: "NOTES/ADD", payload: newNote });
  } catch (error) {
    dispatch({ type: "NOTES/ERROR", payload: error.toString() });
  }
};

export const updateNote = (id, updatedNote) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/LOADING" });
    await serverRequest.editNote(id, updatedNote);
    dispatch({ type: "NOTES/UPDATE", payload: { id, updatedNote } });
  } catch (error) {
    dispatch({ type: "NOTES/ERROR", payload: error.toString() });
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/LOADING" });
    await serverRequest.deleteNote(noteId);
    dispatch({ type: "NOTES/DELETE", payload: noteId });
  } catch (error) {
    dispatch({ type: "NOTES/ERROR", payload: error.toString() });
  }
};

export const setViewedNote = (note) => ({
  type: "NOTES/SET_VIEWED_NOTE",
  payload: note,
});

export const clearViewedNote = () => ({
  type: "NOTES/CLEAR_VIEWED_NOTE",
});

export const getNoteById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/LOADING" });

    const note = await serverRequest.getNote(id);
    dispatch(setViewedNote(note));
  } catch (err) {
    dispatch({ type: "NOTES/ERROR", payload: err.toString() });
  }
};
