import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, TextNode } from "lexical";
import { useEffect } from "react";
import { $createEmojiNode, EmojiNode } from "../nodes/EmojiNode";

function emoticonTransform(node: {
  getTextContent: () => any;
  replace: (arg0: EmojiNode) => void;
}) {
  const textContent = node.getTextContent();
  // When you type :), we will replace it with an emoji node
  if (textContent === ":)") {
    node.replace($createEmojiNode("emoji happysmile", "🙂"));
  }
}

function useEmoticons(editor: LexicalEditor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      emoticonTransform
    );
    return () => {
      removeTransform();
    };
  }, [editor]);
}

export default function EmoticonPlugin() {
  const [editor] = useLexicalComposerContext();
  useEmoticons(editor);
  return null;
}
