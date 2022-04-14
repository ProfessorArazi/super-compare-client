import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.home}>
      <p>
        This is a comparison site that compares three well-known markets <br />
        I created a scraper to get all the latest prices from each market so the
        prices will always be up to date <br />
        Thanks to that I give you the ability to choose the cheapest market
        according to what you are interested in purchasing <br />
        The comparison takes into account the discounts that the markets offer
      </p>
    </div>
  );
};
export default Home;
