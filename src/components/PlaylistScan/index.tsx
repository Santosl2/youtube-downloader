import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useState } from "react";

type PlaylistScanProps = {
  onScan: (url: string) => void;
};

export function PlaylistScan({ onScan }: PlaylistScanProps) {
  const [playlistId, setPlaylistId] = useState("");

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          marginBlock: "2rem",
        }}
      >
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
          }}
        >
          <TextField
            id="standard-basic"
            label="Place here you youtube playlist URL"
            sx={{ minWidth: "100%" }}
            variant="standard"
            onChange={(e) => setPlaylistId(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => onScan(playlistId)}
          >
            Scan Playlist
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
