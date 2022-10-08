import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "../Button";
import DownloadIcon from "@mui/icons-material/Download";

type PlaylistScanProps = {
  onScan: (url: string) => void;
  isLoading: boolean;
};

export function PlaylistScan({ onScan, isLoading }: PlaylistScanProps) {
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
            onClick={() => {
              if (playlistId) {
                onScan(playlistId);
              }

              setPlaylistId("");
            }}
            icon={<DownloadIcon />}
            isLoading={isLoading}
          >
            Scan Playlist
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
