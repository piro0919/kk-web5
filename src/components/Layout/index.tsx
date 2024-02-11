"use client";
import { Box, Grid, Heading } from "@kuma-ui/core";
import { ReactNode } from "react";
import useMeasure from "react-use-measure";
import { useScrollYPosition } from "react-use-scroll-position";
import { useWindowSize } from "usehooks-ts";
import Navigation from "../Navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import getBreakpoints from "@/libs/getBreakpoints";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  const { height: windowHeight } = useWindowSize();
  const scrollY = useScrollYPosition();
  const [ref, { height }] = useMeasure();

  console.log(scrollY, height);

  return (
    <Box>
      <Box height="0px" overflow="hidden" style={{ opacity: 0 }} width="0px">
        <Heading>kk-web</Heading>
      </Box>
      <Grid
        gridTemplateRows={getBreakpoints({
          lg: "auto 1fr auto",
          sm: "1fr",
        })}
        minHeight={windowHeight || "100dvh"}
        pb={getBreakpoints({
          lg: "0",
          sm: "48px",
        })}
      >
        <Box display={getBreakpoints({ lg: "block", sm: "none" })}>
          <Header />
        </Box>
        <Box as="main">{children}</Box>
        <Box display={getBreakpoints({ lg: "block", sm: "none" })}>
          <Footer />
        </Box>
      </Grid>
      <Box
        bottom="0px"
        display={getBreakpoints({ lg: "none", sm: "block" })}
        position="fixed"
        width="100%"
      >
        <MobileMenu />
      </Box>
      <Box
        display={getBreakpoints({ lg: "block", sm: "none" })}
        left={0}
        position="fixed"
        top={scrollY > height ? height : 0}
        transform="translateY(-100%)"
        transition="250ms"
        width="100%"
      >
        <div ref={ref}>
          <Navigation />
        </div>
      </Box>
    </Box>
  );
}
