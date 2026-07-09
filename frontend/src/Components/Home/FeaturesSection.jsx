import React from "react";

function FeaturesSection() {
  const features = [
    {
      title: "Branded Links",
      description: "Create short links with your domain.",
    },
    {
      title: "Advanced Analytics",
      description: "Get real-time insights and track performance.",
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime.",
    },
    {
      title: "Developer Friendly",
      description: "Powerful API and tools for developers.",
    },
  ];

  return (
    <section className="w-full my-12">
      <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-340 mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="h-40 w-full p-10 flex flex-col justify-center items-center  border border-zinc-200 shadow-[0_0px_10px_rgba(0,0,0,0.05)] rounded-xl"
          >
            <h2 className="text-2xl font-semibold text-center mb-4">
              {feature.title}
            </h2>
            <p className="text-center text-zinc-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
