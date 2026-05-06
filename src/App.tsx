import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { CrudApp } from "./components/Crud/CrudApp";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "border border-cyan-900/50 bg-[#162a37] text-cyan-100 text-xs font-medium rounded-xl shadow-2xl shadow-cyan-950/50",
            duration: 4000,

            success: {
              iconTheme: {
                primary: "#06b6d4",
                secondary: "#162a37",
              },
              style: {
                border: "1px solid rgba(6, 182, 212, 0.3)",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#162a37",
              },
              style: {
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
              },
            },
          }}
        />
        <div>
          <Routes>
            <Route path="/" element={<CrudApp />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
