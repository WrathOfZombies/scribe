import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $getSelection } from "lexical";

type onChangeFn = Parameters<typeof OnChangePlugin>["0"]["onChange"];

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
const onChange: onChangeFn = (editorState) => {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
};

export default onChange;
