import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/user/selectors";
import { updateNote, getNoteById } from "../redux/notes/actions";
import { selectViewedNote } from "../redux/notes/selectors";
import NoteForm from "../components/NoteForm";

export default function EditNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const viewedNote = useSelector(selectViewedNote);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getNoteById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (viewedNote && viewedNote.authorId !== userId) {
      navigate("/notes");
    } else if (viewedNote) {
      setTitle(viewedNote.title);
      setText(viewedNote.text);
    }
  }, [viewedNote, userId, navigate]);

  const handleSaveNote = () => {
    const validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = "Title is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedNote = {
        title: title.trim(),
        text: text.trim(),
        authorId: userId,
        id: viewedNote.id,
        date: Date.now(),
      };

      dispatch(updateNote(viewedNote.id, updatedNote));
      navigate(`/view-note/${id}`);
    }
  };

  return (
    <Container className="prose mx-auto mt-2 p-7 bg-white rounded-md shadow-md">
      <Typography variant="h4" className="mb-4 text-blue-600 font-bold pb-5">
        Edit Note
      </Typography>
      {viewedNote && (
        <NoteForm
          title={title}
          setTitle={setTitle}
          text={text}
          setText={setText}
          errors={errors}
          handleSaveNote={handleSaveNote}
        />
      )}
      <Link to="/notes" className="text-blue-500 no-underline pl-3">
        Back to Notes
      </Link>
    </Container>
  );
}
