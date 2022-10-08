import { useCallback, useRef, useState } from "react";
import { api } from "../../../services";
import DownloadIcon from "@mui/icons-material/Download";
import { ALLOWED_FORMATS } from "..";
import { Button } from "../../Button";

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
  format,
}: DownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownloadVideo = useCallback(async () => {
    setIsDownloading(true);
    try {
      await api.post(`/download/${url}`, {
        format,
        title,
      });

      onSuccess(`Download finished! Check your 'Downloads' folder`);
    } catch {
      onError("Error while downloading " + url);
    } finally {
      setIsDownloading(false);
    }
  }, [format]);

  return (
    <>
      <Button
        size="medium"
        onClick={() => handleDownloadVideo()}
        icon={<DownloadIcon />}
        isLoading={isDownloading}
      >
        {isDownloading ? "Downloading..." : "Download"}
      </Button>

      <div ref={containerRef} />
    </>
  );
}
