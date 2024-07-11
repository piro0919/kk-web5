import { promises as fs } from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import parseMD from "parse-md";

function getUniqueChars(text: string): string {
  const charSet = new Set<string>();

  for (const char of text) {
    charSet.add(char);
  }

  return Array.from(charSet).join("");
}

type GetArticleParams = {
  slug: string;
};

type GetArticleData = {
  title: string;
};

async function getArticle({ slug }: GetArticleParams): Promise<GetArticleData> {
  const markdownPath = path.join(
    process.cwd(),
    "/src/markdown-pages",
    `${slug}.md`,
  );
  const fileContents = await fs.readFile(markdownPath, "utf8");
  const { metadata } = parseMD(fileContents);
  const { title } = metadata as {
    title: string;
  };

  return { title };
}

type Context = {
  params: { slug: string };
};

// eslint-disable-next-line import/prefer-default-export
export async function GET(
  _: NextRequest,
  { params: { slug } }: Context,
): Promise<ImageResponse> {
  const { title } = await getArticle({ slug });
  const fontData = await fetch(
    `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(
      getUniqueChars(title),
    )}`,
  ).then((res) => res.text());
  const fontUrl = fontData.match(/url\((.*?)\)/)?.[1];

  if (!fontUrl) {
    throw new Error("Failed to load font");
  }

  const font = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const imageIndex = (parseInt(slug, 10) % 2) + 1;

  return new ImageResponse(
    (
      <div
        style={{
          // background: `url('http://localhost:3000/kk-web_${imageIndex}.png')`,
          background: `url('https://kk-web.link/kk-web_${imageIndex}.png')`,
          display: "flex",
          height: "100%",
          padding: "30px 36px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#fff",
            display: "flex",
            // eslint-disable-next-line quotes
            fontFamily: '"Noto Sans JP", sans-serif',
            fontSize: "42px",
            fontWeight: "bold",
            height: "44%",
            justifyContent: "center",
            padding: "0 36px",
            textAlign: "center",
            width: "100%",
          }}
        >
          {title.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>
    ),
    {
      debug: false,
      fonts: [
        {
          data: font,
          name: "Noto Sans JP",
          style: "normal",
          weight: 700,
        },
      ],
      height: 630,
      width: 1200,
    },
  );
}
