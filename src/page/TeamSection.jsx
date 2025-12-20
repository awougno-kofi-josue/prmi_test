import React from "react";

const teamMembers = [
  {
    name: "Josue Awougno",
    role: "Développeur Principal / Back-end",
    image: "https://via.placeholder.com/150", // tu peux remplacer par de vraies photos
  },
  {
    name: "Bilali Soulemane",
    role: "Front-end / UI Designer",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Medard M.",
    role: "Data Scientist / IA",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Kadanga P.",
    role: "Chef de projet / Coordination",
    image: "https://via.placeholder.com/150",
  },
];

export default function TeamSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Notre Équipe Technique</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
