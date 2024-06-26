import { promises as fs } from "fs";
import path from "path";
import removeMarkdown from "markdown-to-text";
import parseMD from "parse-md";
import SWRProvider from "./swr-provider";
import Blog from "@/components/Blog";
import getMetadata from "@/libs/getMetadata";
import pageSize from "@/libs/pageSize";

export const metadata = getMetadata({ path: "/blog", subTitle: "BLOG" });

// 24 時間ごと
export const revalidate = 86400;

type Article = {
  date: string;
  slug: string;
  text: string;
  title: string;
};

type GetArticlesData = Article[];

async function getArticles(): Promise<GetArticlesData> {
  const markdownPagesPath = path.join(process.cwd(), "/src/markdown-pages");
  const filenames = await fs.readdir(markdownPagesPath);
  const articles = await Promise.all(
    filenames
      .reverse()
      .filter((_, index) => index < pageSize)
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

  return articles;
}

export default async function Page(): Promise<JSX.Element> {
  const articles = await getArticles();

  return (
    <SWRProvider fallbackData={articles}>
      <Blog />
    </SWRProvider>
  );
}
