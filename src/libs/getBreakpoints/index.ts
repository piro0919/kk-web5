type Breakpoint = "sm" | "md" | "lg" | "xl";

type Value = string | number;

export type GetBreakpointsParams<T extends Value> = Partial<
  Omit<Record<Breakpoint, T>, "sm">
> & {
  sm: T;
};

export default function getBreakpoints<T extends Value>(
  breakpoint: GetBreakpointsParams<T>,
): T[] {
  const { lg, md, sm, xl } = breakpoint;
  const breakpoints = [sm, md, lg, xl].reduce<T[]>(
    (previousBreakpoints, currentreakpoint, currentIndex) => {
      return [
        ...previousBreakpoints,
        typeof currentreakpoint !== "undefined"
          ? currentreakpoint
          : previousBreakpoints[currentIndex - 1],
      ];
    },
    [],
  );

  return breakpoints;
}
