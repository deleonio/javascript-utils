import { querySelector } from "query-selector-shadow-root";

export const getElementById = <T extends Element>(
  id: string,
  node?: Document | HTMLElement | ShadowRoot
): T | null => {
  return querySelector(`#${id}`, node);
};
