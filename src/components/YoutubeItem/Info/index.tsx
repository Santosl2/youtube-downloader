import { CardMedia, Divider, Stack, Typography } from "@mui/material";

import type { Item, Result } from "ytpl";

type InfoProps = Pick<Result, "author" | "title" | "estimatedItemCount">;

export function Info({ title, author, estimatedItemCount }: InfoProps) {
  const imageUrl = author?.avatars[0].url ?? "";
  return (
    <>
      <Stack spacing={1}>
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
      <Divider
        sx={{
          marginBlock: 2,
        }}
      />
    </>
  );
}
