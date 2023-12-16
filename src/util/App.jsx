import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../router/Login";
import Home from "../router/Home";
import RequireAuth from "../components/RequireAuth";
import SignUp from "../router/SignUp";
import NotFound from "../router/NotFound";
import Layout from "../router/Layout";
import Notes from "../router/NoteList";
import CreateNote from "../router/CreateNote";
import EditNote from "../router/EditNote";
import ViewNote from "../router/ViewNote";
import { API } from "./api";
import store, { persistor } from "../redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const serverRequest = new API("http://localhost:5001");

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/create-note",
        element: <CreateNote />,
      },
      {
        path: "/edit-note/:id",
        element: <EditNote />,
      },
      {
        path: "/view-note/:id",
        element: <ViewNote />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
  );
}
