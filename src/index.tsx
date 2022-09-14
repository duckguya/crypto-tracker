/* eslint-disable */
// import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* themeProvider 안에 있는 페이지들은 모두 theme으로 접근이 가능하다 */}
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
