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

  const download = useCallback(
    async (blobData: any) => {
      setIsDownloading(true);
      try {
        const url = window.URL.createObjectURL(new Blob([blobData]));
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", `${title}.${format}`);
        containerRef.current?.appendChild(link);
        link.click();

        containerRef.current?.removeChild(link);
      } catch (error) {
        onError("Error convert response to blob");
      } finally {
        setIsDownloading(false);
      }
    },
    [url, title, format, onError, onSuccess]
  );

  const handleDownloadVideo = useCallback(async () => {
    setIsDownloading(true);
    try {
      const { data } = await api.post(
        `/download/${url}`,
        {
          format,
          title,
        },
        {
          responseType: "blob",
        }
      );

      download(data);

      onSuccess(`Download ${title} finished!`);
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
