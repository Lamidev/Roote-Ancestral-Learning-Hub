// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";

// export default function Layout() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-1">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function Layout() {
  const handleSupportClick = () => {
    const preFilledMessage = "Hello! I need help with Roote Ancestral Learning Hub. Could you please assist me?";
    const whatsappUrl = `https://wa.me/12044519525?text=${encodeURIComponent(preFilledMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={handleSupportClick}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
          size="lg"
        >
          <MessageCircle className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
          <span className="font-outfit">Support</span>
        </Button>
      </div>
    </div>
  );
}