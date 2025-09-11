import { useState, useContext } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { loginUser } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      login(data);
      window.location.href = "/dashboard"; // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Email" name="email" value={form.email} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Login</Button>
      </form>
    </Box>
  );
};

export default Login;
