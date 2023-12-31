import { Box, Flex, Heading, Link, Text, VStack } from "@kuma-ui/core";
import getBreakpoints from "@/libs/getBreakpoints";

export default function Application(): JSX.Element {
  const items = [
    {
      href: "https://play.google.com/store/apps/details?id=link.kk_web.omocoro_archive.twa",
      name: "オモコロアーカイブ",
      text: "メディアサイト「オモコロ」の記事をまとめたアプリです。",
    },
    {
      href: "https://play.google.com/store/apps/details?id=link.kk_web.on_memo.twa",
      name: "おんめも",
      text: "様々なデバイスでメモを共有できるアプリです。",
    },
    {
      href: "https://play.google.com/store/apps/details?id=link.kk_web.recigle.twa",
      name: "レシグル",
      text: "レシピを検索しやすくしてくれるアプリです。",
    },
  ].map(({ href, name, text }, index) => (
    <Link href={href} key={name} target="_blank">
      <VStack
        borderTop={index > 0 ? "1px solid var(--color-gray)" : undefined}
        gap={12}
        px={getBreakpoints({
          lg: 0,
          sm: 12,
        })}
        py={24}
      >
        <Heading as="h3" fontSize="2.4rem">
          {name}
        </Heading>
        <Text color="colors.gray">{text}</Text>
      </VStack>
    </Link>
  ));

  return (
    <>
      <Box height="0px" overflow="hidden" style={{ opacity: 0 }} width="0px">
        <Heading as="h2">APPLICATION</Heading>
      </Box>
      <Flex height="100%" justify="center">
        <Box
          px={getBreakpoints({
            lg: 24,
            sm: 0,
          })}
          width="min(960px, 100%)"
        >
          {items}
        </Box>
      </Flex>
    </>
  );
}
