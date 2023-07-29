// eslint-disable-next-line filenames/match-exported, filenames/match-regex
import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  breakpoints: {
    sm: "375px",
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    md: "768px",
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    lg: "992px",
    xl: "1200px",
  },
  colors: {
    black: "#202124",
    brandBlue: "#234794",
    brandRed: "#b33e5c",
    gray: "#808080",
    lightWhite: "#fff",
    white: "#bdc1c6",
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export type Theme = UserTheme;
}

export default theme;
