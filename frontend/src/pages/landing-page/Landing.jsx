import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Search, Calendar, Home, Bolt, Droplet, Zap } from "lucide-react";
// import bikeAnimation from "./bike-animation.json"; // <-- Download & place JSON here
import bikeAnimation from "../../assets/bike-animation.json";
import postWorkAndHire from "../../assets/post-work-hire-animation.json";
import nearWork from "../../assets/near-work-animation.json";
import payment from "../../assets/payment-animation.json";
import ServiceCategories from "./ServiceCategories";
export default function NammaServicesLanding() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState(0);
  const [jobsToday, setJobsToday] = useState(0);
  const PROVIDERS_TARGET = 1248;
  const JOBS_TARGET = 368;

  useEffect(() => {
    let rafId;
    const start = performance.now();
    const duration = 1200;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setProviders(Math.floor(t * PROVIDERS_TARGET));
      setJobsToday(Math.floor(t * JOBS_TARGET));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const services = [
    { title: "Electrician", icon: <Bolt size={22} /> },
    { title: "Plumber", icon: <Droplet size={22} /> },
    { title: "House Cleaner", icon: <Home size={22} /> },
    { title: "Laundry", icon: <Zap size={22} /> },
    { title: "Carpenter", icon: <span className="text-2xl">🔨</span> },
    { title: "Painter", icon: <span className="text-2xl">🎨</span> },
    { title: "AC Repair", icon: <Bolt size={22} /> },
    { title: "Pest Control", icon: <span className="text-2xl">🐜</span> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-green-600"
              >
                Trusted HouseHold Service Providers
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-lg text-slate-600 max-w-xl"
              >
                Select verified professionals instantly — electricians,
                plumbers, cleaners, and more.
              </motion.p>
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-wrap gap-4"
              >
                <div className="p-4 bg-white rounded-2xl shadow-sm w-40 text-center">
                  <div className="text-xs text-slate-400">
                    Service Providers
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {providers.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm w-40 text-center">
                  <div className="text-xs text-slate-400">
                    Jobs Posted Today
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {jobsToday.toLocaleString()}
                  </div>
                </div>
              </motion.div>
              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 to-orange-400 text-white font-semibold shadow-lg"
                >
                  Get Started
                </motion.button>
              </motion.div>
            </div>

            {/* RIGHT SIDE BIKE ANIMATION */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <Lottie
                animationData={bikeAnimation}
                loop={true}
                className="w-full max-w-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-8 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-green-100 flex flex-col items-center p-7 pt-2 gap-1 border border-green-500 rounded-xl shadow-2xl">
            <span>
              <Lottie
                animationData={postWorkAndHire}
                loop={true}
                className="w-25 rounded-full"
              />
            </span>
            <h4 className="text-green-700 font-semibold text-lg">
              Post Work & Hire
            </h4>
            <p className="text-center text-gray-700 text-sm">
              Easily post your work requirements and hire skilled professionals
              near you in minutes.
            </p>
          </div>

          <div className="bg-orange-100 flex flex-col items-center p-7 pt-2 gap-1 border border-orange-500 rounded-xl shadow-2xl">
            <span>
              <Lottie
                animationData={nearWork}
                loop={true}
                className="w-25 rounded-full"
              />
            </span>
            <h4 className="text-orange-700 font-semibold text-lg">
              Find Jobs & Apply
            </h4>
            <p className="text-center text-gray-700 text-sm">
              Discover job opportunities that match your skills and apply
              instantly to start earning.
            </p>
          </div>

          <div className="bg-purple-100 flex flex-col items-center p-7 pt-1 gap-1 border border-purple-500 rounded-xl shadow-2xl">
            <span>
              <Lottie
                animationData={payment}
                loop={true}
                className="w-25 rounded-full"
              />
            </span>
            <h4 className="text-purple-700 font-semibold text-lg">
              Get Paid Securely
            </h4>
            <p className="text-center text-gray-700 text-sm">
              Receive safe and secure payments directly to your account after
              completing your work.
            </p>
          </div>

          {/* <StepCard icon={<Search size={28} />} title="Search Service" desc="Find the service you need instantly." />
          <StepCard icon={<Calendar size={28} />} title="Book Instantly" desc="Choose a convenient time slot." />
          <StepCard icon={<Home size={28} />} title="Get Work Done" desc="Verified professionals at your doorstep." /> */}
        </div>
      </section>

      {/* POPULAR SERVICES */}
      {/* <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold mb-8 text-center">Popular Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} title={s.title} icon={s.icon} />
          ))}
        </div>
      </section> */}
      <ServiceCategories />
    </div>
  );
}

function StepCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-50 to-green-50">
        {icon}
      </div>
      <h4 className="mt-5 text-lg font-semibold">{title}</h4>
      <p className="text-sm text-slate-500 mt-2">{desc}</p>
    </motion.div>
  );
}

function ServiceCard({ title, icon }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center gap-4 text-center cursor-pointer"
    >
      <div className="w-14 h-14 rounded-lg bg-gradient-to-tr from-blue-50 to-green-50 flex items-center justify-center text-green-600">
        {icon}
      </div>
      <div className="font-semibold text-slate-700">{title}</div>
      <div className="text-xs text-slate-500">
        Book experienced {title.toLowerCase()}s in your area
      </div>
    </motion.div>
  );
}
