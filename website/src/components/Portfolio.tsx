import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/globals.css";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
        <nav className="p-5 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-xl font-bold">Your Name</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-300 dark:bg-gray-600 rounded"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </nav>

        <header className="text-center py-20">
          <motion.h2
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Welcome to My Portfolio
          </motion.h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            A passionate developer crafting amazing experiences.
          </p>
        </header>

        <section className="p-10">
          <h3 className="text-2xl font-semibold mb-5">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <motion.div
              className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="text-lg font-bold">Project 1</h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Description of the project.
              </p>
            </motion.div>
            <motion.div
              className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="text-lg font-bold">Project 2</h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Description of the project.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
