import { ImageListItem } from "@mui/material";

type ThumbnailProps = {
  url: string | null;
  title: string;
};

export function Thumbnail({ url, title }: ThumbnailProps) {
  if (!url) return <></>;

  return (
    <ImageListItem
      sx={{
        maxWidth: "100%",
        marginBlock: "1rem",
      }}
    >
      <img src={url} srcSet={url} alt={title} loading="lazy" />
    </ImageListItem>
  );
}
