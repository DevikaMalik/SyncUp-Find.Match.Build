// // server.js
// import chatRoutes from "./routes/aiRoutes.js";
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());

// // ✅ Enable CORS for frontend
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//     credentials: true,
//   })
// );

// // Routes
// app.use("/api", authRoutes);
// app.use("/api", chatRoutes);


// // Start server
// const PORT = process.env.PORT || 5000; // ⚡ don't use 5173 (frontend port)
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";


dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(
cors({
origin: "http://localhost:5173",
credentials: true,
})
);


app.use("/api", authRoutes);
+app.use("/api/ai", aiRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
