"use client";

import type { Ref } from "react";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  BlockTypeSelect,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./Editor.css";

interface EditorProps extends Omit<MDXEditorProps, "ref"> {
  editorRef: Ref<MDXEditorMethods>;
  placeholder: string;
}

export default function Editor({
  editorRef,
  markdown,
  placeholder = "Write more information...",
  ...props
}: EditorProps) {
  return (
    <MDXEditor
      markdown={markdown}
      className="w-full bg-white rounded-t-2xl markdown-editor"
      contentEditableClassName="h-fit min-h-[350px] overflow-y-auto text-gray-500 border border-transparent focus:border focus:border-gray-200 rounded-b-2xl"
      placeholder={placeholder}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkDialogPlugin(),
        linkPlugin(),
        tablePlugin(),
        imagePlugin(),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
        toolbarPlugin({
          toolbarClassName: "!rounded-t-2xl !rounded-b-none",
          toolbarContents: () => {
            return (
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <Separator />

                        <BlockTypeSelect />
                        <BoldItalicUnderlineToggles />
                        <Separator />

                        <ListsToggle />
                        <Separator />

                        <CreateLink />
                        <InsertImage />
                        <Separator />

                        <InsertTable />
                        <InsertThematicBreak />
                        <InsertCodeBlock />
                      </>
                    ),
                  },
                ]}
              />
            );
          },
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
