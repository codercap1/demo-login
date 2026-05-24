export const loginApi = async (email, password) => {
  // Demo tài khoản giả
  if (email === "admin@gmail.com" && password === "123456") {
    return {
      token: "fake-jwt-token",
      user: {
        id: 1,
        name: "Admin",
        email: "admin@gmail.com",
        role: "ADMIN",
      },
    };
  }

  throw new Error("Email hoặc mật khẩu không đúng");
};

export const logoutApi = async () => {
  return true;
};