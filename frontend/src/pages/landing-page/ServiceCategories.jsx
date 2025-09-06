"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Wrench,
  Hammer,
  Brush,
  Car,
  Plug,
  Home,
  Shield,
  Scissors,
  ShoppingCart,
  UtensilsCrossed,
  Sofa,
} from "lucide-react";

const categories = [
  { name: "Plumbing", icon: Wrench },
  { name: "Carpentry", icon: Hammer },
  { name: "Painting", icon: Brush },
  { name: "Electrical", icon: Plug },
  { name: "Security", icon: Shield },
  { name: "Salon", icon: Scissors },
  { name: "Car Repair", icon: Car },
  { name: "House Cleaning", icon: Home },
  { name: "Grocery Delivery", icon: ShoppingCart },
  { name: "Food Delivery", icon: UtensilsCrossed },
  { name: "Furniture Assembly", icon: Sofa },
];

export default function ServiceCategories() {
  const [duplicatedCategories, setDuplicatedCategories] = useState([]);

  useEffect(() => {
    // Duplicate for seamless infinite scrolling
    setDuplicatedCategories([...categories, ...categories]);
  }, []);

  return (
    <div className="w-full bg-white py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Service Categories
      </h2>

      <div className="flex flex-col gap-6">
        {/* Row 1 - Scroll Left */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: ["0%", "-40%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 9,
            }}
          >
            {duplicatedCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={`row1-${index}`}
                  className="flex flex-col bg-orange-30 items-center justify-center w-50 h-20  shadow rounded-xl p-1 py-2 border border-orange-200 hover:shadow-lg transition"
                >
                  <Icon className="w-7 h-7 text-orange-600 mb-2" />
                  <p className="text-sm font-medium text-gray-700 text-center">
                    {category.name}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Row 2 - Scroll Right */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: ["-40%", "0%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 10,
            }}
          >
            {duplicatedCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={`row2-${index}`}
                  className="flex flex-col bg-green-30 items-center justify-center w-36 h-20 shadow rounded-xl p-1 py-2 border border-green-200 hover:shadow-lg transition"
                >
                  <Icon className="w-7 h-7 text-green-600 mb-2" />
                  <p className="text-sm font-medium text-gray-700 text-center">
                    {category.name}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Row 3 - Scroll Left */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: ["0%", "-30%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 8,
            }}
          >
            {duplicatedCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={`row3-${index}`}
                  className="flex flex-col bg-purple-30 items-center justify-center w-36 h-20 shadow rounded-xl p-1 py-2 border border-purple-200 hover:shadow-lg transition"
                >
                  <Icon className="w-7 h-7 text-purple-600 mb-2" />
                  <p className="text-sm font-medium text-gray-700 text-center">
                    {category.name}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
