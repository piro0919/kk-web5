"use client";
import { Box, Grid, Heading } from "@kuma-ui/core";
import { ReactNode } from "react";
import { useWindowSize } from "usehooks-ts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import getBreakpoints from "@/libs/getBreakpoints";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  const { height } = useWindowSize();

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
        minHeight={height || "100dvh"}
        pb={getBreakpoints({
          lg: "0",
          sm: "48px",
        })}
      >
        <Box
          display={getBreakpoints({ lg: "block", sm: "none" })}
          position="sticky"
          top="0"
          zIndex={1}
        >
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
    </Box>
  );
}
