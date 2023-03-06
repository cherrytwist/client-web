import React, { FormEvent, forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import Turndown from 'turndown';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { unified } from 'unified';
import { InputBaseComponentProps } from '@mui/material/InputBase/InputBase';
import { useSetCharacterCount } from './CharacterCountContext';
import MarkdownInputControls from './MarkdownInputControls';

interface MarkdownInputProps extends InputBaseComponentProps {}

export interface MarkdownInputRefApi {
  focus: () => void;
}

export const MarkdownInput = forwardRef<MarkdownInputRefApi, MarkdownInputProps>(
  ({ value, onChange, className, onFocus, onBlur }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [hasFocus, setHasFocus] = useState(false);

    const [htmlContent, setHtmlContent] = useState('');

    const markdownParser = useRef(unified().use(remarkParse).use(remarkRehype).use(rehypeStringify)).current;

    const updateHtmlContent = async () => {
      const content = await markdownParser.process(value);
      setHtmlContent(String(content));
    };

    const editor = useEditor(
      {
        extensions: [StarterKit],
        content: htmlContent,
      },
      [htmlContent]
    );

    useLayoutEffect(() => {
      if (!editor || !hasFocus || editor.getText() === '') {
        updateHtmlContent();
      }
    }, [value, hasFocus]);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => editor?.commands.focus(),
      }),
      [editor]
    );

    const setCharacterCount = useSetCharacterCount();

    useLayoutEffect(() => {
      setCharacterCount(editor?.getText().length ?? 0);
    }, [editor]);

    const turndown = useRef(new Turndown()).current;

    useEffect(() => {
      if (!editor) {
        return;
      }

      const editorInstance = editor;

      const handleStateChange = () => {
        const markdown = turndown.turndown(editorInstance.getHTML()) as string;

        setCharacterCount(editorInstance.getText().length);

        onChange?.({
          currentTarget: {
            value: markdown,
          },
          target: {
            value: markdown,
          },
          meta: {
            plainText: editorInstance.getText(),
          },
        } as unknown as FormEvent<HTMLInputElement>);
      };

      editorInstance.on('update', handleStateChange);

      return () => {
        editorInstance.off('update', handleStateChange);
      };
    }, [editor]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFocus = (event: React.FocusEvent<any>) => {
      setHasFocus(true);
      onFocus?.(event);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBlur = (event: React.FocusEvent<any>) => {
      if (containerRef.current?.contains(event.relatedTarget)) {
        return;
      }
      setHasFocus(false);
      onBlur?.(event);
    };

    return (
      <Box
        ref={containerRef}
        width="100%"
        sx={{
          '.ProseMirror': { outline: 'none' },
          '.ProseMirror p': { margin: 0 },
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <MarkdownInputControls editor={editor} focused={hasFocus} />
        <EditorContent editor={editor} className={className} />
      </Box>
    );
  }
);

export default MarkdownInput;
