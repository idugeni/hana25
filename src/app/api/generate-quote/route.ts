import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key for Gemini is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 2,
  topP: 0.98,
  topK: 100,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST() {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const prompt = `
          Tulis satu kutipan dalam bahasa Jawa yang memiliki makna mendalam dan penuh makna. 
          Pilih tema yang menggugah, seperti kehidupan, cinta, kebijaksanaan, perjuangan, harapan, atau tema lainnya yang memiliki kedalaman emosional dan refleksi. Hindari kutipan yang terlalu klise atau biasa ditemukan. 
          Pastikan kutipan tersebut tidak hanya berkisar pada tema "kerja keras" atau hal-hal yang sudah sering diucapkan, tetapi bisa menggali lebih dalam aspek kehidupan.
            
          Sertakan penjelasan artinya dalam bahasa Indonesia, yang mencakup konteks tema kutipan tersebut.
            
          Format hasil dalam HTML berikut ini:
            
          <blockquote class="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 border-l-8 border-white text-lg italic rounded-xl shadow-2xl">
            <span class="text-white font-semibold text-xl">"Kutipan Jawa"</span>
          </blockquote>

          <blockquote class="bg-gradient-to-r from-gray-600 to-gray-800 p-8 border-l-8 border-gray-400 text-lg italic rounded-xl shadow-2xl mt-6">
            <span class="text-gray-200 text-xl">"Artinya dalam bahasa Indonesia"</span>
          </blockquote>

          <p class="text-gray-700 text-justify mt-6 text-xs md:text-sm lg:text-base font-light leading-relaxed mx-auto px-8 py-4 bg-white/25 rounded-xl shadow-lg">
            Jelaskan makna dari kutipan ini, sesuai dengan tema yang diangkat. Misalnya, jika kutipan ini berkaitan dengan perjuangan hidup, jelaskan tentang pentingnya ketekunan, kesabaran, dan tekad dalam mengatasi tantangan hidup. Jika temanya tentang cinta sejati, fokuskan pada pengorbanan, pengertian, dan kedalaman hubungan antarindividu.
          </p>

          <p class="text-2xl text-white mt-8 italic flex items-center justify-center">
            <span class="text-3xl text-gray-300 mr-4">“</span>
            <span class="font-extrabold text-white">Eliyanto Sarage</span>
            <span class="text-3xl text-gray-300 ml-4">”</span>
          </p>
        `;

    const result = await chatSession.sendMessage(prompt);

    // Mengembalikan hasil dalam format JSON dengan HTML yang dihasilkan
    return NextResponse.json({ htmlQuote: result.response.text() });
  } catch (error) {
    console.error("Error generating quote:", error);
    return NextResponse.json(
      { error: "Failed to generate quote" },
      { status: 500 }
    );
  }
}
