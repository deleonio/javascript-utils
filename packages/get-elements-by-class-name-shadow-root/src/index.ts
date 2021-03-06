import { querySelectorAll } from "query-selector-all-shadow-root";

export const getElementsByClassName = <T extends Element>(
  className: string,
  node?: Document | HTMLElement | ShadowRoot
): T[] => {
  return querySelectorAll<T>(`.${className}`, node);
};
