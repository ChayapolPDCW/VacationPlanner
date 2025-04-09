import { Inter } from 'next/font/google';

import ClientLayout from "./ClientLayout"; // Import the new Client Component

import './globals.css';
import Navbar from '../components/Navbar';
import 'leaflet/dist/leaflet.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Roamuru',
  description: 'Plan your perfect vacation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
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
      </body>
    </html>
  );
}