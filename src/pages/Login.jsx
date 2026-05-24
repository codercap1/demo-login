import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      setLoading(true);

      const response = await loginApi(formData.email, formData.password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Welcome Back</h1>
        <p>Đăng nhập để truy cập hệ thống quản lý.</p>
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Đăng nhập</h2>
          <p className="subtitle">Nhập thông tin tài khoản của bạn</p>

          {error && <div className="error-box">{error}</div>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <div className="demo-account">
            <p>Tài khoản demo:</p>
            <span>Email: admin@gmail.com</span>
            <span>Password: 123456</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;