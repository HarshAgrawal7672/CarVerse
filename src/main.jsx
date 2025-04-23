import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import { ClerkProvider } from '@clerk/clerk-react'
import Index from './profile'
import AddListing from './add-listing'
import SearchByCategory from './search/[category]'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const router= createBrowserRouter(
  [
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/profile",
      element:<Index/>
    },
    {
      path:"/add-listing",
      element:<AddListing/>
    },{
      path:"/search/:category",
      element:<SearchByCategory/>
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router}/>
    </ClerkProvider>

  </StrictMode>,
)
