import { Typography, Divider, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useCallback, useState } from "react";
import type { Item } from "ytpl";
import { Download } from "./Download";
import { Thumbnail } from "./Thumbnail";
import ytEvents from "../../services/events";
import { YOUTUBE_SNACKBAR_ALERT } from "../../services/events/constants";

type YoutubeItemProps = {
  data: Item;
};

export function YoutubeItem({ data }: YoutubeItemProps) {
  const { title, bestThumbnail, id } = data;

  const onError = useCallback((message: string) => {
    ytEvents.emit({
      event: YOUTUBE_SNACKBAR_ALERT,
      data: {
        message,
        type: "error",
      },
    });
  }, []);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <CardContent
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="h5" component="h6">
          {title}
        </Typography>

        <Divider
          sx={{
            marginBlock: 2,
          }}
        />

        <Thumbnail url={bestThumbnail.url} title={title} />
        <Download url={id} onError={onError} onSuccess={onError} />
      </CardContent>
    </Card>
  );
}
