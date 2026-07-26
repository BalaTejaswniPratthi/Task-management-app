import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import EditTaskModal from "./EditTaskModal";

function TaskCard({ task, fetchTasks }) {
  const [showModal, setShowModal] = useState(false);

  const getBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "In Progress":
        return "bg-info";
      default:
        return "bg-warning text-dark";
    }
  };

  const deleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task deleted successfully!");

      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <div className="card shadow h-100 border-0 rounded-4">

        <div className="card-body d-flex flex-column">

          <div className="d-flex justify-content-between align-items-center">

            <h5 className="fw-bold">{task.title}</h5>

            <span className={`badge ${getBadgeClass(task.status)}`}>
              {task.status}
            </span>

          </div>

          <p className="text-muted mt-3 flex-grow-1">
            {task.description || "No description provided."}
          </p>

          <hr />

          <small className="text-secondary mb-3">
            📅 Due Date:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No Due Date"}
          </small>

          <div className="d-flex justify-content-between">

            <button
              className="btn btn-warning"
              onClick={() => setShowModal(true)}
            >
              ✏️ Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={deleteTask}
            >
              🗑 Delete
            </button>

          </div>

        </div>
      </div>

      <EditTaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        task={task}
        fetchTasks={fetchTasks}
      />
    </>
  );
}

export default TaskCard;