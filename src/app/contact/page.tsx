import Client from "./client";
import getMetadata from "@/libs/getMetadata";

export const metadata = getMetadata({ path: "/contact", subTitle: "CONTACT" });

export default function Page(): JSX.Element {
  return <Client />;
}
