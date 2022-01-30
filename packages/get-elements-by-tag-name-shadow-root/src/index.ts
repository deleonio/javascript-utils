import { querySelectorAll } from "query-selector-all-shadow-root";

export const getElementByTagName = <T extends Element>(
  tagName: string,
  node?: Document | HTMLElement | ShadowRoot
): T[] => {
  return querySelectorAll<T>(tagName, node);
};
