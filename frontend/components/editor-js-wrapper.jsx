import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../utils/tools';

export default function RTE_Component({ data }) {
  return (
    <EditorJs
      tools={EDITOR_JS_TOOLS}
      data={data}
      inlineToolbar={true}
      hideToolbar={true}
    />
  );
}
