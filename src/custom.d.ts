declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  const content: any;
  const viewBox: string;
  const width: string;
  const height: string;
  export { content, src };
}
