import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "زینوا - پلتفرم هوشمند توسعه دارو",
  description: "پلتفرم هوشمند و یکپارچه ردیابی مسیر دارو و بهینه‌سازی اتصال به گیرنده. راهکار انقلابی برای کاهش هزینه و زمان توسعه داروها.",
  keywords: "زینوا, توسعه دارو, هوش مصنوعی, دارو, شبیه‌سازی مولکولی",
  authors: [{ name: "تیم زینوا" }],
  openGraph: {
    title: "زینوا - پلتفرم هوشمند توسعه دارو",
    description: "راهکار انقلابی برای کاهش هزینه و زمان توسعه داروها",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="antialiased font-vazir">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
