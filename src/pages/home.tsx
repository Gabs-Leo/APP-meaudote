import { AboutUs } from "../components/about_us/AboutUs";
import { BlogSection } from "../components/blog/BlogSection";
import { CardSection } from "../components/cards/CardSection";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Metrics } from "../components/metrics/Metrics";
import { Navbar } from "../components/navbar/Navbar";

export const Home = () => {
    return(<>
      <Navbar />
      <Header>
        <h2 
        data-aos-mirror="true" 
        data-aos="fade-right" 
        data-aos-duration="1600">
        Adote um Pet
        </h2>
        <h1 
        data-aos-mirror="true" 
        data-aos="fade-left" 
        data-aos-duration="1600">
        Salve uma Vida
        </h1>
      </Header>
      <AboutUs />
      <Metrics />
      <CardSection />
      <BlogSection />
      <Footer />
    </>)
}