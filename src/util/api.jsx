export class API {
  constructor(url) {
    this.url = url;
  }
  handleFetch = (URL) => {
    return fetch(URL).then((response) => {
      if (!response.ok) throw new Error(`Fetch error: ${response.status}`);
      return response.json();
    });
  };
  getNotes = (authorId) =>
    this.handleFetch(`${this.url}/notes?authorId=${authorId}`);

  getNote = (id) => this.handleFetch(`${this.url}/notes/${id}`);

  getUser = (authorId) => this.handleFetch(`${this.url}/users/${authorId}`);

  getUserByEmail = (email) =>
    this.handleFetch(`${this.url}/users?email=${email}`);

  deleteNote = (id) =>
    fetch(`http://localhost:5001/notes/${id}`, {
      method: "DELETE",
    });

  addNote = async (newNote) => {
    try {
      const response = await fetch(`http://localhost:5001/notes/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error(`Failed to add note. Status: ${response.status}`);
      }

      const createdNote = await response.json();
      return createdNote;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  };

  addUser = async (newUser) => {
    await fetch(`http://localhost:5001/users/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  };

  editNote = async (id, updatedNote) => {
    await fetch(`http://localhost:5001/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });
  };
}
