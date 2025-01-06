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
      src: "src/assets/satvik-sharma.png",
      github: "https://github.com/sudo-Satvik",
      linkedin: "https://www.linkedin.com/in/satvik-sharmaaa/",
    },
    {
      quote:
        "Expertise in Langflow and AI contributed significantly to enhancing the project's data handling and automation capabilities",
      name: "Sahil Sharma",
      designation: "Backend Developer & AI Expert",
      src: "src/assets/sahil-sharma.png",
      github: "https://github.com/SAHIL-Sharma21",
      linkedin: "https://www.linkedin.com/in/sahil-sharma2001/",
    },
    {
      quote:
        "Played a pivotal role in designing the user interface, ensuring an intuitive and visually appealing experience",
      name: "Devendra Kumar",
      designation: "Frontend & UI Designer",
      src: "src/assets/devendra-kumar.png",
      github: "https://github.com/KumaDevendra",
      linkedin: "https://www.linkedin.com/in/devendra-kumar-aa66bb224/",
    },
  ];
  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className=" text-center" id="home">
      <HeroHighlight className="mt-[5rem]">
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
          <Highlight className="text-white">
            EngageLens
          </Highlight>
        </motion.h1>
        <motion.p 
          className="text-xl sm:text-2xl text-gray-400 mb-8 mt-5"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Unlock powerful insights from your social media engagement data using AI and advanced analytics
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-x-4"
        >
          <Link to={"/dashboard"}>
            <Button size="lg" variant="outline" className='text-black hover:bg-black hover:text-white  transition-all duration-300'
            >Get Started</Button>
          </Link>
          <Link to={"/login"}>
          <Button
              variant="outline"
              className="relative group overflow-hidden px-4 py-2 border-2 border-white bg-black text-white transition-all duration-300"
              size="lg"
            >
              <span className="relative z-10">Login</span>
            </Button>
          </Link>
        </motion.div>
      </HeroHighlight>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800" id="features">
        <h2 className="text-4xl font-bold text-center mb-16">
          Features
        </h2>
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
              title: "Connect Your Accounts",
              description:
                "Easily link your social media accounts to our secure platform.",
            },
            {
              title: "Data Collection & Processing",
              description:
                "We fetch and process your engagement data using advanced algorithms.",
            },
            {
              title: "AI-Powered Analysis",
              description:
                "Our AI analyzes your data to uncover trends and insights.",
            },
            {
              title: "Generate Custom Reports",
              description:
                "Create detailed reports tailored to your specific needs and goals.",
            },
            {
              title: "Implement Strategies",
              description:
                "Use our actionable insights to refine your social media strategy.",
            },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              className="flex items-start mb-12"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
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
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              name: "Dr. Jane Smith",
              role: "AI Research Lead",
              bio: "With over 15 years of experience in AI and machine learning, Dr. Smith leads our research initiatives in social media analytics.",
            },
            {
              name: "Mike Johnson",
              role: "Full Stack Developer",
              bio: "Mike is a seasoned developer with expertise in building scalable data processing systems and intuitive user interfaces.",
            },
            {
              name: "Sarah Lee",
              role: "Data Scientist",
              bio: "Sarah specializes in statistical analysis and predictive modeling, bringing deep insights to our social media performance metrics.",
            },
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-700 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-400 mb-4">{member.role}</p>
              <div className="w-40 h-40 rounded-full bg-gray-600 mx-auto mb-6"></div>
              <p className="text-gray-300 text-center mb-6">{member.bio}</p>
              <div className="text-center">
                <Button
                  variant="outline"
                  className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-gray-900"
                >
                  Learn More <ChevronRight className="ml-2 inline-block" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div> */}
        <AnimatedTestimonials testimonials={testimonials} />
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-blue-900 to-purple-900" >
        <h2 className="text-4xl font-bold mb-6">
          Ready to Analyze Your Social Media?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of businesses already leveraging our AI-powered
          analytics platform.
        </p>
        <Link to={"/register"}>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
            Get Started Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
