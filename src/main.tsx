import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { UserContextProvider } from './context/UserContext.tsx';

import { routeTree } from './routeTree.gen.ts';
import { CloudinaryContextProvider } from './context/CloudinaryContext.tsx';

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <CloudinaryContextProvider>
    <RouterProvider router={router} />
    </CloudinaryContextProvider>
  </UserContextProvider>
)
