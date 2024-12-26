import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./(redux)/(providers)/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Misraj Assignment",
  description: "Developed by Mohammad Taiseer Tello",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        {/* Bootstrap JS */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
