import { useState, useContext } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { registerUser } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(form);
      login(data);
      window.location.href = "/dashboard"; // redirect after register
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5">Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Email" name="email" value={form.email} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Register</Button>
      </form>
    </Box>
  );
};

export default Register;
