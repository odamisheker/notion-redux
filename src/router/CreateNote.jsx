import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import NoteForm from "../components/NoteForm";
import { useSelector, useDispatch } from "react-redux";
import { selectUserId } from "../redux/user/selectors";
import { addNote } from "../redux/notes/actions"; 

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const authorId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const handleCreateNote = async () => {
    const validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = "Title is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const newNote = {
        title: title.trim(),
        text: text.trim(),
        date: Date.now(),
        authorId: authorId,
      };

      dispatch(addNote(newNote))
        .then((createdNote) => {
          navigate(`/view-note/${createdNote.id}`);
        })
        .catch((error) => console.error("Error creating note: ", error));
    }
  };

  return (
    <Container>
      <Typography variant="h1">Create Note</Typography>
      <NoteForm
        title={title}
        setTitle={setTitle}
        text={text}
        setText={setText}
        errors={errors}
        handleSaveNote={handleCreateNote}
      />
      <Link to="/notes" className="text-blue-500 no-underline pl-3">
        Back to Notes
      </Link>
    </Container>
  );
};

export default CreateNote;
