import { Box, Flex, Heading, Link, Text, VStack } from "@kuma-ui/core";
import getBreakpoints from "@/libs/getBreakpoints";

export default function NpmPackage(): JSX.Element {
  const items = [
    {
      href: "https://www.npmjs.com/package/next-firebase-authentication",
      name: "next-firebase-authentication",
      text: "Next.js と Firebase Authentication を容易に繋ぎこむ独自フックを提供します。",
    },
    {
      href: "https://www.npmjs.com/package/react-three-toggle",
      name: "react-three-toggle",
      text: "3 つ以上のスイッチを持つトグルボタン用のコンポーネントを提供します。",
    },
    {
      href: "https://www.npmjs.com/package/react-comic-viewer",
      name: "react-comic-viewer",
      text: "画像などを見開きで閲覧できるコンポーネントを提供します。",
    },
    {
      href: "https://www.npmjs.com/package/use-pwa",
      name: "use-pwa",
      text: "PWA の状態やインストール用の関数を渡す独自フックを提供します。",
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
        <Heading as="h2">NPM PACKAGE</Heading>
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
