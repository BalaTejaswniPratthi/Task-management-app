import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import API from "../services/api";
import { toast } from "react-toastify";

function EditTaskModal({ show, handleClose, task, fetchTasks }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.put(`/tasks/${task._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task Updated Successfully!");

      fetchTasks();
      handleClose();
    } catch (err) {
      toast.error("Update Failed");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="primary" onClick={updateTask}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;