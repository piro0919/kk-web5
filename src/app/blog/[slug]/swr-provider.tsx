// eslint-disable-next-line filenames/match-regex
"use client";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

export type SWRProviderProps = {
  children: ReactNode;
  fallback: { [key: string]: unknown } | undefined;
};

export default function SWRProvider({
  children,
  fallback,
}: SWRProviderProps): JSX.Element {
  return <SWRConfig value={{ fallback }}>{children}</SWRConfig>;
}
