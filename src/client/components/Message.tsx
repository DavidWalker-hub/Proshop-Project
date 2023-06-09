import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
  variant?: string;
  children?: React.ReactNode;
}

export const Message: React.FC<Props> = ({ variant = "info", children }) => {
  return (
    <>
      <Alert variant={variant}>{children}</Alert>
    </>
  );
};
