import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoanCalculator from "./components/LoanCalculator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch mt-9">
          <LoanCalculator />
          <Banner />
        </div>
      </main>

      <Footer />
    </div>
  );
}