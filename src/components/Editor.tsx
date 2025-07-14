// src/components/Editor.tsx

import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
  editorDidMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    minimap: { enabled: false },
  };

  return (
    <MonacoEditor
      width="100%"
      height="400"
      language="javascript"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={(newValue) => onChange(newValue)}
    />
  );
};

export default Editor;
