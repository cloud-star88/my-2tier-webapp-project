// require("dotenv").config();

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const cors = require("cors");
// require("dotenv").config();
// const authRoutes = require("./routes/authRoutes");
// const taskRoutes = require("./routes/taskRoutes");
// const profileRoutes = require("./routes/profileRoutes");

// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI)
// mongoose.connect(mongoUrl, err => {
//   if (err) throw err;
//   console.log("Mongodb connected...");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/profile", profileRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
// }

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Backend is running on port ${port}`);
// });

require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(cors());

// --------------------
// Correct MongoDB Connection
// --------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.error("MongoDB connection error:", err));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

// Production build for frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
  );
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
