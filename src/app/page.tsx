"use client";

import Link from "next/link";
import Snowfall from "react-snowfall";

export default function Home() {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white relative">
      <Snowfall
        snowflakeCount={150}
        speed={[0.5, 0.5]}
        radius={[1, 3]}
        color="white"
      />
      <div className="hero-content text-center relative z-0">
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 transition-all duration-500 ease-in-out">
            <span className="text-yellow-300">Selamat</span> <span className="text-blue-800">Ulang Tahun!</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 transition-all duration-500 ease-in-out">
            <span className="bg-secondary rounded-full text-primary-content px-2 sm:px-4 md:px-6 lg:px-8">Rikhanatun Ni&apos;mah</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 transition-all duration-500 ease-in-out">
            Di usia ke-25 ini, semoga selalu diberkahi dengan cinta,
            kebahagiaan, dan kesuksesan. Terima kasih telah menjadi
            bagian terbaik dalam hidupku.
          </p>

          <Link href="/moments">
            <button className="btn btn-primary transition-all duration-500 ease-in-out">
              🎁 Lihat Kejutan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
