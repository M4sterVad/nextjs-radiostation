import React from "react";
import "./globals.css";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">{children}</body>
    </html>
  );
};

export default RootLayout;
