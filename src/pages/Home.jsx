import { useNavigate } from "react-router-dom";
import { logoutApi } from "../services/authService";

function Home() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await logoutApi();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <h2>My System</h2>

        <button className="logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </nav>

      <main className="home-content">
        <div className="welcome-card">
          <h1>Trang chủ</h1>
          <p>
            Xin chào, <strong>{user?.name}</strong>
          </p>

          <div className="user-info">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;