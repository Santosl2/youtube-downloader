import { Button, CardMedia, Divider, Stack, Typography } from "@mui/material";
import { useCallback } from "react";

import type { Result } from "ytpl";
import ytEvents from "../../../services/events";
import { DOWNLOAD_RESET } from "../../../services/events/constants";

type InfoProps = Pick<Result, "author" | "title" | "estimatedItemCount">;

export function Info({ title, author, estimatedItemCount }: InfoProps) {
  const imageUrl = author?.avatars[0].url ?? "";

  const handleDownloadReset = useCallback(() => {
    ytEvents.emit({
      event: DOWNLOAD_RESET,
      data: {},
    });
  }, []);

  return (
    <>
      <Stack spacing={1} marginBottom={1}>
        <Typography variant="subtitle2" component="h6">
          Playlist ({estimatedItemCount} videos)
        </Typography>
        <Typography variant="h5" component="h6">
          {title}
        </Typography>
        <Stack spacing={2} direction="row" alignItems={"center"}>
          <CardMedia
            component="img"
            sx={{ width: 50, borderRadius: "50%" }}
            image={imageUrl}
            alt={title}
          />
          <Typography variant="subtitle2" component="h6">
            {author.name}
          </Typography>
        </Stack>
      </Stack>

      <Button
        variant="text"
        sx={{
          width: "100%",
        }}
        onClick={handleDownloadReset}
      >
        Download another playlist
      </Button>

      <Divider
        sx={{
          marginBlock: 2,
        }}
      />
    </>
  );
}
