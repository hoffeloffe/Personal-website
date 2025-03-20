import React from "react";

interface CodeInputProps {
  fileName: string;
  value: string;
  onChange: (value: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ fileName, value, onChange }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
    }}>
      <div style={{
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        padding: "10px",
        fontSize: "14px",
        fontFamily: "monospace",
        userSelect: "none",
        textAlign: "left",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px"
      }}>
        {fileName}
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          height: "200px",
          fontFamily: "monospace",
          fontSize: "14px",
          backgroundColor: "#282c34",
          color: "#ffffff",
          padding: "10px",
          resize: "none",
          outline: "none",
          border: "none",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px"
        }}
        readOnly
      />
    </div>
  );
};