import React, { useState } from 'react';

const TaskForm = () => {
  // États pour stocker les valeurs saisies
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  // Fonction appelée quand on soumet le formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("Titre :", title);
    console.log("Description :", description);
    console.log("Échéance :", deadline);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titre :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description :</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Échéance :</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <button type="submit">Créer la tâche</button>
    </form>
  );
};

export default TaskForm;
const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.filter(t => t._id !== id)); // on retire la tâche de la liste
  } catch (err) {
    console.error("Erreur lors de la suppression");
  }
};
