import { SVGProps } from "react";

const Add = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    height="1em"
    width="1em"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);
export default Add;
