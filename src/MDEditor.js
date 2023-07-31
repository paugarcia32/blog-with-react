import React, { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);
const Code = ({ inline, children = [], className, ...props }) => {
  const demoid = useRef(`dome${randomid()}`);
  const code = getCode(children);
  const demo = useRef(null);
  useEffect(() => {
    if (demo.current) {
      import("mermaid").then((mermaid) => {
        try {
          const str = mermaid.default.render(
            demoid.current,
            code,
            () => null,
            demo.current
          );
          demo.current.innerHTML = str;
        } catch (error) {
          demo.current.innerHTML = error;
        }
      });
    }
  }, [code, demo]);

  if (
    typeof code === "string" &&
    typeof className === "string" &&
    /^language-mermaid/.test(className.toLowerCase())
  ) {
    return (
      <code ref={demo}>
        <code id={demoid.current} style={{ display: "none" }} />
      </code>
    );
  }
  return <code className={String(className)}>{children}</code>;
};

const getCode = (arr = []) => arr.map((dt) => {
  if (typeof dt === "string") {
    return dt;
  }
  if (dt.props && dt.props.children) {
    return getCode(dt.props.children);
  }
  return false;
}).filter(Boolean).join("");


export default function App({ value, onChange }) {
  return (
    <MDEditor
      onChange={onChange}
      textareaProps={{
        placeholder: "Please enter Markdown text",
      }}
      height={500}
      value={value}
      previewOptions={{
        components: {
          code: Code,
        },
      }}
    />
  );
}