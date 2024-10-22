import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router";
import "./index.css";
import { Toaster } from "sonner";
import UserDetailsProvider from "./store/user-store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserDetailsProvider>
      <AppRouter />
      <Toaster />
    </UserDetailsProvider>
  </StrictMode>
);
