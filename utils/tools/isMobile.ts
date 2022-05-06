import { DetectUA } from "detect-ua";

export const isMobile = () => {
  const device = new DetectUA();
  return device.isMobile;
};
