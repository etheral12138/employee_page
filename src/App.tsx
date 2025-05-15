import { useState, useEffect } from "react";
import EmployeeProfile from "./components/EmployeeProfile";
import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

function App() {
  const [isDark, setIsDark] = useState(() => {
    // 从localStorage读取主题设置，默认为系统主题
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    // 应用主题到document
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    // 检查浏览器是否支持ViewTransition
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setIsDark(!isDark);
      });
    } else {
      setIsDark(!isDark);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-end mb-2">
          <Button
            isIconOnly
            variant="light"
            aria-label="切换主题"
            onPress={toggleTheme}
            className="transition-transform hover:scale-110"
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>
        </div>
        <EmployeeProfile employeeId="emp001" />
      </div>
    </div>
  );
}

export default App;
