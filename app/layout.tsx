//import '#/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'auto' }}>
      <head />
      <body style={{ scrollBehavior: 'auto' }}>
        <div>{children}</div>
      </body>
    </html>
  );
}
