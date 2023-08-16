import { useState } from "react";

function useEditor() {
  const [content, setContent] = useState("");

  // Función para manejar el cambio de contenido del editor
  function handleEditorChange(newContent) {
    setContent(newContent);
  }

  return { content, handleEditorChange };
}

export default useEditor;
