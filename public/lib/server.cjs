const express = require("express");
const youtube = require("youtube-pl");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/playlist/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "No playlist Id provided" });

  try {
    const playlist = await new youtube.Playlist(id).getPlaylistInfo();
    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/download/:id", async (req, res) => {
  const { id } = req.params;
  const { format = "mp3", downloadFolder = "" } = req.body;

  if (!id) return res.status(400).json({ error: "No playlist Id provided" });

  try {
    const playlist = await new youtube.Download(id).downloadSpecifyVideo();
    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen("5000", () => {
  console.log("Youtube server started on port 5000");
});