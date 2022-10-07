import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { api } from "../../../services";
import DownloadIcon from "@mui/icons-material/Download";

type DownloadProps = {
  url: string;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
};
export function Download({ url, onError, onSuccess }: DownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadVideo = useCallback(async () => {
    setIsDownloading(true);
    try {
      const startDownload = await api.post(`/download/${url}`, {
        format: "mp3",
      });
    } catch {
      onError("Error while downloading " + url);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return (
    <Button
      variant="contained"
      onClick={() => handleDownloadVideo()}
      disabled={isDownloading}
      startIcon={<DownloadIcon />}
    >
      {isDownloading ? "Downloading..." : "Download"}
    </Button>
  );
}
