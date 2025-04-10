import { Inter } from "next/font/google";

import ClientLayout from "./ClientLayout"; // Import the new Client Component

import "./globals.css";
import "leaflet/dist/leaflet.css";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Roamuru",
  description: "Plan your perfect vacation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ClientLayout>{(children)}</ClientLayout>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
