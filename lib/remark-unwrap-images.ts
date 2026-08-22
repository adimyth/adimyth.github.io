// Markdown wraps a standalone `![]()` in a <p>, but EssayImage renders a
// <div> wrapper for wide diagrams — <div> is not valid inside <p> and React
// flags it as a hydration mismatch. Replace `paragraph > image` (and nothing
// else) with the image node directly, one level up.
type MdastNode = {
  type: string;
  children?: MdastNode[];
  [key: string]: unknown;
};

export default function remarkUnwrapImages() {
  return (tree: MdastNode) => {
    const visit = (node: MdastNode) => {
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (
          child.type === "paragraph" &&
          child.children?.length === 1 &&
          child.children[0].type === "image"
        ) {
          return [child.children[0]];
        }
        visit(child);
        return [child];
      });
    };
    visit(tree);
  };
}
