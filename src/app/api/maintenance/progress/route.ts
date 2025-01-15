import { NextResponse } from "next/server";

const startDate = new Date("2024-01-25T00:00:00");
const targetDate = new Date("2025-01-25T00:00:00");

export async function GET() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return NextResponse.json({
      progress: 100,
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    });
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const duration = targetDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const progressPercentage = (elapsed / duration) * 100;

  return NextResponse.json({
    progress: Math.min(Math.max(progressPercentage, 0), 100),
    timeLeft: { days, hours, minutes, seconds },
  });
}
