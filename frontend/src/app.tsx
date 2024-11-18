import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./components/auth-context";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { router } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HelmetProvider>
          <Helmet titleTemplate="FPM | %s" />
          <Toaster />
          <AuthProvider>
            <RouterProvider
              router={router}
              future={{
                v7_startTransition: true,
              }}
            />
          </AuthProvider>
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
