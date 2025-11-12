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
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={handleSupportClick}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-5 shadow-lg hover:shadow-xl transition-all duration-300 group"
          size="icon"
        >
          <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    </div>
  );
}