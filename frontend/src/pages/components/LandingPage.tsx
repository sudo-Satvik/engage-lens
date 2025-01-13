import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Database,
  Cpu,
  TrendingUp,
  BarChart2,
  PieChart,
  MessageSquare,
} from "react-feather";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Link } from "react-router";
import { Sidebar } from "lucide-react";
import { MacbookScrollDemo } from "@/components/Showcase";
import satvikImage from "../../assets/satvik-sharma.png";
import sahilImage from "../../assets/sahil-sharma.png";
import devendraImage from "../../assets/devendra-kumar.png";

import { Vortex } from "@/components/ui/vortex";

const LandingPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const testimonials = [
    {
      quote:
        "Contributed to both the frontend and backend development, ensuring a smooth and user-friendly experience",
      name: "Satvik Sharma",
      designation: "Full Stack & UI/UX Developer",
      src: satvikImage,
      github: "https://github.com/sudo-Satvik",
      linkedin: "https://www.linkedin.com/in/satvik-sharmaaa/",
    },
    {
      quote:
        "Expertise in Langflow and AI contributed significantly to enhancing the project's data handling and automation capabilities",
      name: "Sahil Sharma",
      designation: "Backend Developer & AI Expert",
      src: sahilImage,
      github: "https://github.com/SAHIL-Sharma21",
      linkedin: "https://www.linkedin.com/in/sahil-sharma2001/",
    },
    {
      quote:
        "Played a pivotal role in designing the user interface, ensuring an intuitive and visually appealing experience",
      name: "Devendra Kumar",
      designation: "Frontend & UI Designer",
      src: devendraImage,
      github: "https://github.com/KumaDevendra",
      linkedin: "https://www.linkedin.com/in/devendra-kumar-aa66bb224/",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className=" text-center" id="home">
        <HeroHighlight className="mt-[-3rem] sm:mt-[5rem]">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
          >
            Discover the Power of Social Media Analysis with{" "}
            <Highlight className="text-white">EngageLens</Highlight>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-400 mb-8 mt-5"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Unlock powerful insights from your social media engagement data
            using AI and advanced analytics
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-x-4"
          >
            <Link to={"/dashboard"}>
              <Button
                variant="outline"
                className="relative group overflow-hidden px-4 py-2 border-2 border-white bg-black text-white transition-all duration-300"
                size="lg"
              >
                <span className="relative z-10 flex gap-2">
                  <Sidebar />
                  Dashboard
                </span>
              </Button>
            </Link>
          </motion.div>
        </HeroHighlight>
        <MacbookScrollDemo />
      </section>

      <section className="max-w-[1440px]"></section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800" id="features">
        <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12  max-w-[1440px] mx-auto">
          {[
            {
              title: "Advanced Data Fetching",
              icon: <Database className="w-12 h-12 mb-4 text-blue-400" />,
              description:
                "Seamlessly collect and store engagement data from multiple social media platforms.",
            },
            {
              title: "AI-Powered Analysis",
              icon: <Cpu className="w-12 h-12 mb-4 text-purple-400" />,
              description:
                "Leverage cutting-edge AI algorithms to analyze post performance and user behavior.",
            },
            {
              title: "Real-time Insights",
              icon: <TrendingUp className="w-12 h-12 mb-4 text-green-400" />,
              description:
                "Get up-to-the-minute insights on your social media performance and trends.",
            },
            {
              title: "Custom Reporting",
              icon: <BarChart2 className="w-12 h-12 mb-4 text-yellow-400" />,
              description:
                "Generate tailored reports with visualizations that matter most to your business.",
            },
            {
              title: "Competitor Analysis",
              icon: <PieChart className="w-12 h-12 mb-4 text-red-400" />,
              description:
                "Benchmark your performance against competitors and industry standards.",
            },
            {
              title: "Content Recommendations",
              icon: (
                <MessageSquare className="w-12 h-12 mb-4 text-indigo-400" />
              ),
              description:
                "Receive AI-generated content ideas based on your audience engagement patterns.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-700 p-8 rounded-lg shadow-lg"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="work">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="max-w-4xl mx-auto">
          {[
            {
              title: "Data Aggregation and Display",
              description:
                "Our system fetches real-time engagement metrics, categorizing data into totals, growth metrics, and distribution.",
            },
            {
              title: "Visualize Engagement Trends",
              description:
                "Get a clear overview of your performance with visual charts for metrics like total engagements, post distribution, and growth trends.",
            },
            {
              title: "Dive Into Analytics by Category",
              description:
                "Understand which post types—static, carousel, or reels—are driving the most engagement with detailed growth metrics.",
            },
            {
              title: "Make Data-Driven Decisions",
              description:
                "Leverage insights from our dashboard to refine your content strategy and achieve better engagement.",
            },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              className="flex items-start mb-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-lg">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800" id="about">
        <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-black">
        <div className="w-[100%] mx-auto rounded-md  h-[30rem] overflow-hidden">
          <Vortex
            backgroundColor="black"
            className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
          >
            <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
              Ready to Analyze Your Social Media?
            </h2>
            <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
              Join thousands of businesses already leveraging our AI-powered
              analytics platform.
            </p>
            <Link to={"/dashboard"}>
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-200 mt-4"
              >
                Navigate to Dashboard
              </Button>
            </Link>
          </Vortex>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
