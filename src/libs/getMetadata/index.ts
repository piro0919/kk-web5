import { Metadata } from "next";

export type GetMetadataParams = {
  description?: string;
  imageIndex?: number;
  path?: string;
  subTitle?: string;
  type?: "article" | "website";
};

export default function getMetadata({
  description = "Freelance front end developer and video creator piro's website",
  imageIndex = 0,
  path = "/",
  subTitle = "",
  type = "article",
}: GetMetadataParams): Metadata {
  return {
    alternates: {
      canonical: `https://kk-web.link${path}`,
    },
    applicationName: "kk-web",
    authors: [{ name: "piro", url: "https://kk-web.link" }],
    creator: "piro",
    description,
    openGraph: {
      description,
      images: [
        {
          url: `https://kk-web.link/kk-web_${imageIndex}.png`,
        },
      ],
      siteName: "kk-web",
      title: `${subTitle && `${subTitle} - `}kk-web`,
      type,
      url: `https://kk-web.link${path}`,
    },
    robots: {
      follow: true,
      index: true,
    },
    title: `${subTitle && `${subTitle} - `}kk-web`,
    twitter: {
      card: "summary_large_image",
      images: `https://kk-web.link/kk-web_${imageIndex}.png`,
    },
  };
}
