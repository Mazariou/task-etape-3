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
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          status: statusFilter,
          search: search,
          sort: sort
        }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des tâches");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, search, sort]);

  return (
    <div>
      <div>
        <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Tous</option>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Trier par</option>
          <option value="deadline">Échéance</option>
          <option value="created">Date de création</option>
        </select>
      </div>

      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Statut : {task.status}</p>
          <p>Échéance : {task.deadline ? new Date(task.deadline).toLocaleDateString() : "Non définie"}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
