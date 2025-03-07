import { useState, useEffect } from "react";
import { gsap } from "gsap";
import FormLogin from "../components/organisms/FormLogin.jsx";

const Login = () => {
  const slideData = [
    {
      image: "/images/login-1.png",
      headline: "Kelola Inventaris Lebih Mudah",
      description:
        "Pantau stok barang secara real-time. Dengan sistem manajemen inventaris yang efisien, operasional bisnis Anda jadi lebih teratur dan hemat waktu.",
    },
    {
      image: "/images/login-2.png",
      headline: "Cashflow Terkontrol, Bisnis Stabil",
      description:
        "Atur arus kas masuk dan keluar dengan transparan. Fitur ini membantu Anda membuat keputusan keuangan yang lebih tepat untuk menjaga stabilitas bisnis dan meningkatkan profitabilitas.",
    },
    {
      image: "/images/login-3.png",
      headline: "Rekap Data Konsumen dengan Praktis",
      description:
        "Simpan dan kelola data konsumen dalam satu tempat. Rekap otomatis ini mempermudah Anda dalam memantau riwayat transaksi dan membangun hubungan yang lebih baik dengan pelanggan.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the slide from left to center
    tl.fromTo(
      ".slide",
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 3 }
    )
      .to(".slide", { x: "100%", opacity: 0, duration: 3, delay: 5 }) // Move slide out
      .call(() => {
        setCurrentSlide((prev) => (prev + 1) % slideData.length); // Move to the next slide
      });

    return () => tl.kill(); // Cleanup the animation on unmount
  }, [currentSlide, slideData.length]);

  return (
    <div className="h-screen grid grid-cols-2">
      {/* Left animation section */}
      <div className="bg-[#58B843] flex flex-col justify-center items-center p-1 md:p-4 overflow-hidden  col-span-2 md:col-span-1">
        <div className="slide text-white w-full">
          <img
            src={slideData[currentSlide].image}
            alt="logo"
            className="w-full h-40 md:h-64 object-contain"
          />
          <div className="mt-4">
            <h1 className="text-xl md:text-3xl font-bold text-center">
              {slideData[currentSlide].headline}
            </h1>
            <p className="text-base text-center mt-2">
              {slideData[currentSlide].description}
            </p>
          </div>
        </div>
      </div>

      {/* Right section with form */}
      <div className="flex flex-col md:justify-center items-center col-span-2 md:col-span-1 mt-8 md:mt-0">
        <div className="w-full md:w-3/4 px-4">
          <h1 className="text-3xl font-bold">Selamat Datang 👋</h1>
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
