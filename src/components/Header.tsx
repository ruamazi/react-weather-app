import { useTheme } from "@/context/theme-provider";
import { Link } from "react-router-dom";
import SearchCity from "./SearchCity";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={theme === "dark" ? "/logo.svg" : "/logo2.svg"}
            alt="Klimate logo"
            className="h-14"
            height={45}
            width={45}
          />
        </Link>

        <div className="flex gap-4">
          <SearchCity />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
