
import { ReactNode } from 'react';

// Define metadata (title, description, etc.)
export const metadata = {
  title: 'Resume Builder',
  description: 'A simple Next.js-based resume builder application',
};

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <header>
        
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024 Resume Builder. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
