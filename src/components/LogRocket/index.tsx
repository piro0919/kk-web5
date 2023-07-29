"use client";
import LogRocketComponent from "logrocket";
import setupLogRocketReact from "logrocket-react";
import { Fragment, useEffect } from "react";

export default function LogRocket(): JSX.Element {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_LOG_ROCKET_APP_ID) {
      return;
    }

    LogRocketComponent.init(process.env.NEXT_PUBLIC_LOG_ROCKET_APP_ID);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setupLogRocketReact(LogRocketComponent);
  }, []);

  return <Fragment />;
}
