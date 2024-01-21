import { TRANSFORMERS } from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import emotionStyled from "@emotion/styled";
import { motion } from "framer-motion";
import { ContentEditableOuter } from "./components/contentEditable";
import { Placeholder } from "./components/placeholder";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import editorConfig from "./editorConfig";
import onChange from "./onChange";
import {
  default as AutoLinkPlugin,
  default as AutolinkPugin,
} from "./plugins/AutoLinkPlugin";
import AutocompletePlugin from "./plugins/AutocompletePlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import ComponentPickerMenuPlugin from "./plugins/ComponentPickerPlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import EmoticonPlugin from "./plugins/EmoticonPlugin";
import MentionsPlugin from "./plugins/MentionsPlugin";
import MyCustomAutoFocusPlugin from "./plugins/MyCustomAutoFocusPlugin";
import SpeechToTextPlugin from "./plugins/SpeechToTextPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";

const EditorContainer = emotionStyled(motion.div)`
  background: white;
  border-radius: 2px;
  color: #000;
  position: relative;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
`;

export default function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <SharedAutocompleteContext>
        <EditorContainer>
          <RichTextPlugin
            contentEditable={<ContentEditableOuter />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <TreeViewPlugin />
          <EmoticonPlugin />
          <MyCustomAutoFocusPlugin />
          <AutolinkPugin />
          <CodeHighlightPlugin />
          <AutocompletePlugin />
          <MentionsPlugin />
          <DraggableBlockPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ComponentPickerMenuPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <SpeechToTextPlugin />
        </EditorContainer>
      </SharedAutocompleteContext>
    </LexicalComposer>
  );
}
