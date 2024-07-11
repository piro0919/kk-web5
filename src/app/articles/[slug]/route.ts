import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import parseMD from "parse-md";

export type GetArticleResponseBody = {
  content: string;
  date: string;
  title: string;
};

type Context = {
  params: { slug: string };
};

// eslint-disable-next-line import/prefer-default-export
export async function GET(
  _: NextRequest,
  { params: { slug } }: Context,
): Promise<NextResponse<GetArticleResponseBody>> {
  const markdownPath = path.join(
    process.cwd(),
    "/src/markdown-pages",
    `${slug}.md`,
  );
  const fileContents = await fs.readFile(markdownPath, "utf8");
  const { content, metadata } = parseMD(fileContents);
  const { date, title } = metadata as {
    date: string;
    slug: string;
    title: string;
  };

  return NextResponse.json({ content, date, title }, { status: 200 });
}
