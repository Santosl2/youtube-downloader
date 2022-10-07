type CustomEventProps = {
  event: string;
  callback: (props: any) => void;
};

type CustomEventPublishProps = Pick<CustomEventProps, "event"> & {
  data: any;
};

class YTEvents {
  public subscribe({ event, callback }: CustomEventProps) {
    document.addEventListener(event, callback);
  }

  public unsubscribe({ event, callback }: CustomEventProps) {
    document.removeEventListener(event, callback);
  }

  public emit({ event, data }: CustomEventPublishProps) {
    const eventToDispatch = new CustomEvent(event, { detail: data });
    document.dispatchEvent(eventToDispatch);
  }
}

const events = new YTEvents();

export default events;
