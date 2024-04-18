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
        <Header />
        <AboutUs />
        <Metrics />
        <CardSection />
        <BlogSection />
        <Footer />
    </>)
}