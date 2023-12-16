import React, { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container, Typography, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { serverRequest } from "../util/App";
import { selectUserId } from "../redux/user/selectors";
import { selectViewedNote } from "../redux/notes/selectors";
import { getNoteById, clearViewedNote } from "../redux/notes/actions";

export default function ViewNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const viewedNote = useSelector(selectViewedNote);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getNoteById(id));
    return () => {
      dispatch(clearViewedNote());
    };
  }, [dispatch, id]);

  const handleEditNote = () => {
    navigate(`/edit-note/${id}`);
  };

  const handleDeleteNote = () => {
    serverRequest.deleteNote(id)
      .then(() => {
        navigate("/notes");
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  if (!viewedNote || viewedNote.authorId !== userId) {
    return (
      <Container>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container className="mx-auto my-8 p-8 bg-white rounded-md shadow-md">
      <div className="flex justify-start items-center space-x-4 mb-6">
        <IconButton
          onClick={handleEditNote}
          aria-label="edit"
          className="text-gray-600 hover:text-gray-800"
        >
          ✍️
        </IconButton>
        <IconButton
          onClick={handleDeleteNote}
          aria-label="delete"
          className="text-red-500 hover:text-red-600"
        >
          🗑️
        </IconButton>
        <Link
          to="/notes"
          className="text-blue-500 hover:underline"
        >
          Back to Notes
        </Link>
      </div>
      <Typography variant="h2" className="mb-4 text-blue-600 font-bold">
        {viewedNote.title}
      </Typography>
      <Typography variant="body1" className="whitespace-pre-wrap mb-4">
        {viewedNote.text}
      </Typography>
    </Container>
  );
};

