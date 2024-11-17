import { ReactNode } from "react";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
        <div className="container mx-auto px-4 text-center text-gray-200">
          <p>Made with React.js by Mohssin</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
