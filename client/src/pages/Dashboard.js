import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import Loading from "../components/Loading";

import "../styles/dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Search + Filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Navbar />

      <div className="container py-4">

        {/* Statistics */}
        <StatsCards tasks={tasks} />

        {/* Search & Filter */}
        <div className="row mt-4">

          <div className="col-md-8 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

        </div>

        {/* Add Task */}
        <div className="mb-5">
          <AddTask fetchTasks={fetchTasks} />
        </div>

        {/* Loading */}
        {loading ? (
          <Loading />
        ) : filteredTasks.length === 0 ? (
          <div className="text-center mt-5">
            <h3>No Tasks Found</h3>
            <p className="text-muted">
              Create a new task to get started.
            </p>
          </div>
        ) : (
          <div className="row">

            {filteredTasks.map((task) => (
              <div className="col-md-6 col-lg-4 mb-4" key={task._id}>
                <TaskCard
                  task={task}
                  fetchTasks={fetchTasks}
                />
              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default Dashboard;