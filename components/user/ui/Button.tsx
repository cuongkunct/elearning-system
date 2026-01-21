import { Button as HeroButton } from "@heroui/button";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children }) => {
  return <HeroButton color="primary">{children}</HeroButton>;
};

export default Button;
