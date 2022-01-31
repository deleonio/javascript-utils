export const querySelector = <T extends Element>(
  selector: string,
  node: Document | HTMLElement | ShadowRoot = document
): T | null => {
  if (
    (node as unknown) instanceof Document ||
    (node as unknown) instanceof HTMLElement ||
    (node as unknown) instanceof ShadowRoot
  ) {
    let domNode: T | null = node.querySelector<T>(selector);
    if (domNode === null) {
      const nodeList: NodeListOf<HTMLElement> =
        node.querySelectorAll<HTMLElement>('[class*="hydrated"]');
      for (let i = 0; i < nodeList.length; i++) {
        const shadowRoot: ShadowRoot = nodeList[i].shadowRoot as ShadowRoot;
        if (typeof shadowRoot === "object" && shadowRoot !== null) {
          domNode = querySelector(selector, shadowRoot);
        } else {
          domNode = querySelector(selector, nodeList[i]);
        }
        if (domNode !== null) {
          break;
        }
      }
    }
    return domNode;
  } else {
    throw new Error(
      `The parameter document for the method querySelector is not type of Document, HTMLElement or ShadowRoot.`
    );
  }
};
