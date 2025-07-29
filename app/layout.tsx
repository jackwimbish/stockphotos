import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Slightly Off Stock Photos',
  description: 'Generate perfect stock photos with one hilariously wrong detail',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
