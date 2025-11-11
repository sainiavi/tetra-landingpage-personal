import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Kode_Mono } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const kodeMono = Kode_Mono({
  subsets: ['latin'],
  weight: ['400','500','600','700'], // optional weights
  variable: '--font-kode-mono',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tetra - Onchaintradingterminal for global markets',
  description: 'Redefining how global markets trade on-chain',
  openGraph: {
    title: "Tetra - Onchaintradingterminal for global markets",
    description: "Redefining how global markets trade on-chain",
    url: "https://www.tetraexchange.one/",
    siteName: "Tetra",
    type: "website",
    images: [
      {
        url: "https://www.tetraexchange.one/og-twitter.jpg",
        width: 1200,
        height: 630,
        alt: "Tetra Preview"
      }
    ],
  },
  twitter: {
    card: "summary_large_image", 
    title: "Tetra - Onchain trading terminal for global markets",
    description: "Redefining how global markets trade on-chain.",
    images: ["https://www.tetraexchange.one/og-twitter.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' ' + kodeMono.variable + 'bg-black'}>
        {children}
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
          theme="dark"
        />
      </body>
    </html>
  )
}
