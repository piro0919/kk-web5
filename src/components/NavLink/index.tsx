import { Link as KumaUiLink } from "@kuma-ui/core";
import Link, { LinkProps } from "next/link";
import { ComponentProps } from "react";

export type NavLinkProps = Pick<LinkProps, "href"> &
  ComponentProps<typeof KumaUiLink>;

export default function NavLink({
  children,
  href,
  ...props
}: NavLinkProps): JSX.Element {
  return (
    <Link href={href} legacyBehavior={true} passHref={true}>
      <KumaUiLink {...props}>{children}</KumaUiLink>
    </Link>
  );
}
