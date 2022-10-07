import { useEffect, useState } from "react";
import { YOUTUBE_SNACKBAR_ALERT } from "../../../services/events/constants";
import ytEvents from "../../../services/events";
import { Snackbar, SnackbarProps } from "../../Snackbar";

export function ListSnackBarMessage() {
  const [data, setData] = useState<SnackbarProps | undefined>(undefined);

  useEffect(() => {
    ytEvents.subscribe({
      event: YOUTUBE_SNACKBAR_ALERT,
      callback: (e) => {
        const { message, type } = e.detail;
        setData({ message, type });
      },
    });

    return () =>
      ytEvents.unsubscribe({
        event: YOUTUBE_SNACKBAR_ALERT,
        callback: () => {},
      });
  }, []);

  return (
    <>{data ? <Snackbar message={data.message} type={data.type} /> : null}</>
  );
}
