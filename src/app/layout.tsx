import "../styles/globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PrivateRoute>{children}</PrivateRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
