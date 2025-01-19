import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import { NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    '<div role="alert" className="alert alert-error">' +
      '<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">' +
      '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />' +
      '</svg>' +
      '<span>Error! API key for Google Generative AI is missing.</span>' +
      '</div>'
  );
}

const ai = genkit({
  plugins: [googleAI({ apiKey })],
  model: gemini15Flash,
});

const generationConfig = {
  config: {
    maxOutputTokens: 8192,
    temperature: 2,
    topP: 0.98,
    topK: 40,
  },
};

export async function POST() {
  try {
    const system =
      'Anda adalah seorang tokoh terkemuka yang mendalami filsafat dengan kedalaman luar biasa, memiliki pemahaman yang mendalam tentang berbagai aliran pemikiran, dan ahli dalam merangkai pemikiran-pemikiran filosofis yang kaya akan makna. Keahlian Anda dalam merumuskan konsep-konsep abstrak mampu menyentuh esensi kehidupan dan menginspirasi banyak orang untuk menggali makna lebih dalam dari setiap aspek kehidupan yang mereka jalani. Anda bukan hanya menguasai teori-teori filsafat, tetapi juga memiliki kemampuan untuk menerapkannya dalam kehidupan sehari-hari dengan cara yang sangat bijaksana dan reflektif.';

    const prompt = `
      Tulis sebuah kutipan dalam bahasa Jawa yang memiliki makna mendalam dan penuh arti, yang tidak hanya sekadar kata-kata biasa. Hindari penggunaan kutipan klise atau yang sering ditemukan di media sosial. Jauhi juga kalimat yang terkesan monoton seperti 'Wong urip iku...', 'Wong kang...', atau 'Wong urip iku mung...'. Fokuskan kutipan tersebut untuk memberikan motivasi terkait pekerjaan, hidup, dan cinta, serta jika memungkinkan, meliputi aspek-aspek positif lainnya yang dapat memberi inspirasi dan pencerahan dalam menjalani kehidupan.

      Format hasil dalam HTML berikut ini:

      <blockquote class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 border-l-8 border-white text-sm sm:text-xs md:text-sm lg:text-base italic rounded-xl shadow-2xl">
        <span class="text-white font-semibold text-lg sm:text-base md:text-lg lg:text-xl">"Kutipan Jawa"</span>
      </blockquote>

      <blockquote class="bg-gradient-to-r from-gray-600 to-gray-800 p-6 border-l-8 border-gray-400 text-sm sm:text-xs md:text-sm lg:text-base italic rounded-xl shadow-2xl mt-6">
        <span class="text-gray-200 text-lg sm:text-base md:text-lg lg:text-xl">"Artinya dalam bahasa Indonesia"</span>
      </blockquote>

      <p class="text-gray-700 text-justify mt-6 text-xs sm:text-xs md:text-sm lg:text-sm font-light leading-relaxed mx-auto px-6 py-3 bg-white/25 rounded-xl shadow-lg">
        Jelaskan makna dari kutipan tersebut secara langsung, dengan fokus pada arti dan pesan yang terkandung di dalamnya secara jelas dan mendalam.
      </p>

      <p class="text-xl sm:text-lg md:text-xl lg:text-2xl text-white mt-8 italic flex items-center justify-center">
        <span class="text-2xl sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mr-4">“</span>
        <span class="font-extrabold text-white sm:text-lg md:text-xl lg:text-2xl">Eliyanto Sarage</span>
        <span class="text-2xl sm:text-xl md:text-2xl lg:text-3xl text-gray-300 ml-4">”</span>
      </p>
    `;

    const { text } = await ai.generate({
      system,
      prompt,
      ...generationConfig,
    });

    return NextResponse.json({ htmlQuote: text });
  } catch {
    return NextResponse.json(
      {
        htmlError: `
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error! Failed to generate quote. Please try again later.</span>
          </div>
        `,
      },
      { status: 500 }
    );
  }
}
