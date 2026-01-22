"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { differenceInSeconds } from "date-fns";

interface TimerProps {
  expiresAt: string;
  onExpire: () => void;
}

function calculateTimeLeft(expiresAt: string) {
  const now = new Date();
  // Waktu saat ini

  const expires = new Date(expiresAt);
  // Konversi string expiresAt menjadi objek Date

  const seconds = differenceInSeconds(expires, now);
  // Hitung selisih waktu (expires - now) dalam detik

  return Math.max(0, seconds);
  // Pastikan nilai tidak negatif (minimal 0)
}

export function Timer({ expiresAt, onExpire }: TimerProps) {
  // State untuk menyimpan sisa waktu (dalam detik)
  // Function initializer dipakai agar dihitung sekali saat mount
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(expiresAt));

  useEffect(() => {
    // Membuat interval yang berjalan setiap 1 detik
    const interval = setInterval(() => {
      // Update state menggunakan callback agar aman dari stale state
      setTimeLeft(() => {
        // Hitung ulang sisa waktu
        const next = calculateTimeLeft(expiresAt);

        // Jika waktu sudah habis
        if (next <= 0) {
          clearInterval(interval);
          // Hentikan interval agar tidak terus berjalan

          onExpire();
          // Jalankan aksi ketika waktu habis (misalnya auto submit quiz)
        }

        return next;
        // Simpan nilai terbaru ke state
      });
    }, 1000);

    // Cleanup effect saat component unmount atau dependency berubah
    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);
  // Effect akan diulang jika deadline atau callback berubah

  // Konversi detik menjadi menit
  const minutes = Math.floor(timeLeft / 60);

  // Sisa detik setelah dikonversi ke menit
  const seconds = timeLeft % 60;

  // Indikator waktu hampir habis (< 5 menit)
  const isLowTime = timeLeft < 300;

  // Indikator waktu kritis (< 1 menit)
  const isCritical = timeLeft < 60;

  return (
    <div
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-lg font-semibold ${
        isCritical
          ? "bg-red-100 text-red-700"
          : isLowTime
            ? "bg-orange-100 text-orange-700"
            : "bg-blue-100 text-blue-700"
      }`}
    >
      <Clock className="w-5 h-5" />

      {/* Format waktu MM:SS */}
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
