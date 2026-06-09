import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const teamMembers = [
  {
    id: 1,
    name: "Sauji Adhikari",
    role: "Sr. Graphic Designer",
    hashtag: "#faultyluffy",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&q=80",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&q=80",
    ],
  },
  {
    id: 2,
    name: "Riya Sharma",
    role: "Social Media Manager",
    hashtag: "#social",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&q=80",
    ],
  },
  {
    id: 3,
    name: "nameless person",
    role: "SEO Strategist",
    hashtag: "#seo",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=300&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&q=80",
    ],
  },
  {
    id: 4,
    name: "Priya Koirala",
    role: "Brand Strategist",
    hashtag: "#brandbuilder",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80",
      "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=300&q=80",
      "https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=300&q=80",
    ],
  },
]

const TeamSection = () => {
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState(false)

  const openModal = (member) => {
    setSelected(member)
    setTimeout(() => setVisible(true), 10)
  }

  const closeModal = () => {
    setVisible(false)
    setTimeout(() => setSelected(null), 350)
  }

  return (
    <>
      {/* ── Our Team Section ── */}
      <section className="relative py-8 px-6 md:px-12 bg-white w-full ">
        <div className="max-w-full mx-auto">

          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-gray-500 text-xl font-semibold tracking-wide">Our Team</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => openModal(member)}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-50 object-cover object-top grayscale transition-all duration-500
                    group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent
                  p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-bold">{member.name}</p>
                  <p className="text-yellow-300 text-[10px]">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Member Modal ── */}
      {selected && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300
            ${visible ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"}`}
          onClick={closeModal}
        >
          {/* X close button — top right of screen */}
          <button
            onClick={closeModal}
            className={`absolute top-6 right-6 z-[60] text-yellow-400 transition-all duration-300
              ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          >
            <IoClose size={40} />
          </button>

          {/*
            Outer wrapper — large enough that floating images sit OUTSIDE the yellow card.
            Yellow card is centered inside this wrapper.
            Floating images are absolutely positioned relative to this wrapper.
          */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative transition-all duration-350 ease-out`}
            style={{ width: "680px", height: "560px" }}
          >

            {/* ── Floating image: TOP LEFT (outside card, upper-left region) ── */}
            <div
              className={`absolute top-0 left-0 w-52 h-36 rounded-2xl overflow-hidden shadow-2xl z-10
                transition-all duration-500 delay-100
                ${visible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-6 translate-y-6"}`}
            >
              <img src={selected.workImages[0]} alt="work" className="w-full h-full object-cover" />
            </div>

            {/* ── Floating image: BOTTOM LEFT (outside card, lower-left region) ── */}
            <div
              className={`absolute bottom-0 left-10 w-48 h-36 rounded-2xl overflow-hidden shadow-2xl z-10
                transition-all duration-500 delay-150
                ${visible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-6 -translate-y-6"}`}
            >
              <img src={selected.workImages[1]} alt="work" className="w-full h-full object-cover" />
            </div>

            {/* ── Floating image: RIGHT SIDE (outside card, right region) ── */}
            <div
              className={`absolute right-0 bottom-12 w-52 h-44 rounded-2xl overflow-hidden shadow-2xl z-10
                transition-all duration-500 delay-200
                ${visible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-6 translate-y-6"}`}
            >
              <img src={selected.workImages[2]} alt="work" className="w-full h-full object-cover" />
            </div>

            {/* ── Yellow card — centered in wrapper ── */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
                transition-all duration-350 ease-out
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            >
              <div className="bg-yellow-400 rounded-3xl px-8 pt-6 pb-8 w-64 h-100 flex flex-col items-center shadow-2xl">

                {/* Name */}
                <h2 className="text-white text-xl font-black text-center leading-tight">
                  {selected.name}
                </h2>
                {/* Role */}
                <p className="text-white/80 text-xs font-medium mb-4 mt-0.5">
                  {selected.role}
                </p>

                {/* Circular photo + hashtag */}
                <div className="relative flex items-center justify-center w-full mb-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                    <img
                      src={selected.photo}
                      alt={selected.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Hashtag badge — floats to bottom-right of circle, stays inside card */}
                  <div
                    className="absolute -bottom-3 right-2 bg-white text-gray-800
                      text-[11px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap z-30"
                  >
                    {selected.hashtag}
                  </div>
                </div>

                {/* Contact button */}
                <button
                  className="flex items-center gap-2 border-2 border-white text-white text-sm
                    font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-yellow-400
                    transition-all duration-200 mt-2"
                >
                  Contact {selected.name.split(' ')[0]}
                  
                </button>

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default TeamSection