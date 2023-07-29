"use client";
import { Fragment, useEffect } from "react";
import { hotjar } from "react-hotjar";

export default function Hotjar(): JSX.Element {
  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_HOTJAR_ID ||
      !process.env.NEXT_PUBLIC_HOTJAR_SV
    ) {
      return;
    }

    hotjar.initialize(
      parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID, 10),
      parseInt(process.env.NEXT_PUBLIC_HOTJAR_SV, 10),
    );
  }, []);

  return <Fragment />;
}
