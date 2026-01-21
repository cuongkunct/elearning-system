import { Button as HeroButton } from "@heroui/button";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, onClick }) => {
  return <HeroButton onClick={onClick} color="primary">{children}</HeroButton>;
};
export default Button;
