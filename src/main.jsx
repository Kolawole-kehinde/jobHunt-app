import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contextApi/authContext.jsx";
import { Toaster } from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(

  
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App/>
      <Toaster />
      </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
