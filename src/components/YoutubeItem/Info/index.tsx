import { Divider, Typography } from "@mui/material";

import type { Item, Result } from "ytpl";

type InfoProps = Pick<Result, "author" | "title">;

export function Info({ title, author }: InfoProps) {
  return (
    <>
      <Typography variant="subtitle2" component="h6">
        Playlist
      </Typography>
      <Typography variant="h5" component="h6">
        {title}
      </Typography>
      <Divider
        sx={{
          marginBlock: 2,
        }}
      />
    </>
  );
}
