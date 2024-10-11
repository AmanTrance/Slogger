import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="h-screen w-full"
      >
        {children}
      </body>
    </html>
  );
}
