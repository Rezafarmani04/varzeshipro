import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Hero from "./home/Hero";
import FeaturedProducts from "./home/FeaturedProducts";
import CategorySection from "./home/CategorySection";
import BrandSection from "./home/BrandSection";
import NewsletterSection from "./home/NewsletterSection";
import Services from "./home/Services";
import Achievements from "./home/Achievements";
import Testimonials from "./home/Testimonials";
import Blogs from "./home/Blogs";
import Start from "./home/Start";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <Services />
      <Achievements />
      <BrandSection />
      <Testimonials />
      <Blogs />
      <Start />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
