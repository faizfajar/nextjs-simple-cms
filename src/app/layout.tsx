import "../styles/globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { MenuProvider } from "../context/MenuContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <AuthProvider>
          <MenuProvider>{children}</MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
