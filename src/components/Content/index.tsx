import { Suspense, useCallback, useEffect, useState } from "react";

import { api } from "../../services";
import ytEvents from "../../services/events";

import type { Result } from "ytpl";
import React from "react";
import {
  DOWNLOAD_RESET,
  YOUTUBE_SNACKBAR_ALERT,
} from "../../services/events/constants";

const LazyYoutubeItem = React.lazy(async () =>
  import("../YoutubeItem").then((module) => ({ default: module.YoutubeItem }))
);

const LazyPlaylistScan = React.lazy(async () =>
  import("../PlaylistScan").then((module) => ({ default: module.PlaylistScan }))
);

const LazyInfo = React.lazy(async () =>
  import("../YoutubeItem/Info").then((module) => ({ default: module.Info }))
);

export function Content() {
  const [playlistData, setPlaylistData] = useState<Result>({} as Result);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePlaylist = useCallback(async (url: string) => {
    setIsLoading(true);
    try {
      const playlistData = await api.get<Result>(`/playlist/${url}`);

      setPlaylistData(playlistData.data);
    } catch {
      ytEvents.emit({
        event: YOUTUBE_SNACKBAR_ALERT,
        data: {
          message: "Error while fetching playlist ",
          type: "error",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    ytEvents.subscribe({
      event: DOWNLOAD_RESET,
      callback: (e) => {
        setPlaylistData({} as Result);
      },
    });

    return () =>
      ytEvents.unsubscribe({
        event: DOWNLOAD_RESET,
        callback: () => {},
      });
  }, []);

  return (
    <>
      {!playlistData.items ? (
        <Suspense fallback={<></>}>
          <LazyPlaylistScan onScan={handlePlaylist} isLoading={isLoading} />
        </Suspense>
      ) : (
        <>
          <Suspense fallback={<></>}>
            <LazyInfo
              author={playlistData.author}
              title={playlistData.title}
              estimatedItemCount={playlistData.estimatedItemCount}
            />
          </Suspense>

          {playlistData.items.map((item) => (
            <Suspense fallback={<></>} key={item.id}>
              <LazyYoutubeItem data={item} />
            </Suspense>
          ))}
        </>
      )}
    </>
  );
}
