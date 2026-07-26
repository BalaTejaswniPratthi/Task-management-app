import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AddTask({ fetchTasks }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/tasks", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task Added Successfully!");

      setTask({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
      });

      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4">
      <div className="card-body">

        <h3 className="text-center mb-4">
          ➕ Add New Task
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              rows="3"
              className="form-control"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter description"
            ></textarea>
          </div>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>

              <select
                className="form-select"
                name="status"
                value={task.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Due Date</label>

              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            type="submit"
          >
            Add Task
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddTask;