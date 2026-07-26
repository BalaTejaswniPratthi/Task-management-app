import { FaTasks, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <h3 className="text-white mb-0">
          <FaTasks className="me-2" />
          Task Manager
        </h3>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;