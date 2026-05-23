import express from "express";
import path from "path";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

const clientBuildPath = path.resolve(__dirname, "..", "client", "build");
app.use(express.static(clientBuildPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
