import { promises as fs } from "fs";
import path from "path";
import removeMarkdown from "markdown-to-text";
import { NextRequest, NextResponse } from "next/server";
import parseMD from "parse-md";
import pageSize from "@/libs/pageSize";

type Article = {
  date: string;
  slug: string;
  text: string;
  title: string;
};

export type GetArticlesResponseBody = Article[];

// eslint-disable-next-line import/prefer-default-export
export async function GET(
  request: NextRequest,
): Promise<NextResponse<GetArticlesResponseBody>> {
  const paramPage = request.nextUrl.searchParams.get("page");
  const page = typeof paramPage === "string" ? parseInt(paramPage, 10) : 0;
  const markdownPagesPath = path.join(process.cwd(), "/src/markdown-pages");
  const filenames = await fs.readdir(markdownPagesPath);
  const articles = await Promise.all(
    filenames
      .reverse()
      .filter(
        (_, index) => index < pageSize * (page + 1) && index >= pageSize * page,
      )
      .map(async (filename) => {
        const markdownPagePath = path.join(markdownPagesPath, filename);
        const fileContents = await fs.readFile(markdownPagePath, "utf8");
        const { content, metadata } = parseMD(fileContents);
        const { date, slug, title } = metadata as {
          date: string;
          slug: string;
          title: string;
        };

        return {
          date,
          slug,
          text: removeMarkdown(content.slice(0, 200)),
          title,
        };
      }),
  );

  return NextResponse.json(articles, { status: 200 });
}
