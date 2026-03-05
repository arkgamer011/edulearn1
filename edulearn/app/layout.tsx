import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import AITutor from '@/components/AITutor';
import DoraemonTheme from '@/components/DoraemonTheme';
import { ThemeProvider } from '@/lib/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'EduLearn - Online Learning Platform',
  description: 'Learn from the best educators online with AI Tutor.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans bg-bg-page text-text-main antialiased transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <DoraemonTheme />
          <div className="mx-auto max-w-md bg-bg-card min-h-screen shadow-2xl relative overflow-hidden flex flex-col border-x-4 border-primary">
            {/* Theme Header Accent */}
            <div className="h-1.5 bg-accent w-full shrink-0"></div>
            <div className="flex-1 flex flex-col relative z-10">
              {children}
            </div>
            <AITutor />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
