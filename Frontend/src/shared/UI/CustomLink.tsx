import type { ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";

type CustomLinkProps = {
  children: ReactNode;
  to: string;
  className?: string;
};

export default function CustomLink({
  children,
  to,
  ...props
}: CustomLinkProps) {
  const match = useMatch(to);

  return (
    <Link
      to={to}
      {...props}
      style={{
        color: match ? "#2563eb" : "#6b7280",
      }}
    >
      {children}
    </Link>
  );
}
