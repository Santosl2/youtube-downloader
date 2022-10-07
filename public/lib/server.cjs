const express = require("express");
const youtube = require("youtube-pl");
const cors = require("cors");
const app = express();
const fs = require("fs/promises");

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
  const { format = "mp3", title = "" } = req.body;

  if (!id) return res.status(400).json({ error: "No playlist Id provided" });

  try {
    const fileLocale = `downloads/${playlist?.title}.${format}`;
    const fileExists = await fs.stat(fileLocale);

    if (title && fileExists) {
      return res.download(fileLocale);
    }
    const playlist = await new youtube.Download().downloadSpecifyVideo(id);

    return res.download(fileLocale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

app.delete("/download/:id", async (req, res) => {
  const { id } = req.params;
  const { format = "mp3" } = req.body;

  if (!id) return res.status(400).json({ error: "No playlist Id provided" });

  try {
    const file = `downloads/${playlist?.title}.${format}`;

    await fs.unlink(file);

    return res.json({ message: "File deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen("5000", () => {
  console.log("Youtube server started on port 5000");
});
