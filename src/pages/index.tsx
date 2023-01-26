import HomePage from "../lib/pages/home";
import HomeProvider from "../lib/pages/home/provider";

const Home = () => {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  );
};

export default Home;
