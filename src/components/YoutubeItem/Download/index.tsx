import { Button } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { api } from "../../../services";
import DownloadIcon from "@mui/icons-material/Download";
import { ALLOWED_FORMATS } from "..";

type DownloadProps = {
  url: string;
  title: string;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
  format: ALLOWED_FORMATS;
};
export function Download({
  url,
  title,
  onError,
  onSuccess,
  format = "mp3",
}: DownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const download = useCallback(
    async (data: any) => {
      const blobResponse = new Blob([data]);
      const blobURL = window.URL.createObjectURL(blobResponse);
      const link = document.createElement("a");

      link.href = blobURL;
      link.setAttribute("download", title);

      containerRef.current?.appendChild(link);
      link.click();
      link.remove();
    },
    [containerRef]
  );

  const handleDownloadVideo = useCallback(async () => {
    setIsDownloading(true);
    try {
      const startDownload = await api.post(
        `/download/${url}`,
        {
          format,
          title,
        },
        {
          responseType: "blob",
        }
      );

      download(startDownload.data);

      onSuccess(`Download ${title} finisehd!`);
    } catch {
      onError("Error while downloading " + url);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => handleDownloadVideo()}
        disabled={isDownloading}
        startIcon={<DownloadIcon />}
      >
        {isDownloading ? "Downloading..." : "Download"}
      </Button>
      <div ref={containerRef} />
    </>
  );
}
