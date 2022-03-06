import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import classes from "./Result.module.css";
import { Button } from "react-bootstrap";

const Result = (props) => {
  const links = {
    מגה: "https://www.mega.co.il/",
    "יינות ביתן": "https://www.ybitan.co.il/",
    "רמי לוי": "https://www.rami-levy.co.il/he",
  };

  let prices = props.prices;
  const maxItems = Math.max(
    prices[0][2].length,
    prices[1][2].length,
    prices[2][2].length
  );

  const addPadding = (length) => {
    let list = [];
    for (let i = 0; i < maxItems - length; i++) {
      list.push("");
    }

    return (
      <ul className={classes.padding}>
        {list.map((x) => (
          <li></li>
        ))}
      </ul>
    );
  };

  const firstPadding = addPadding(prices[0][2].length);
  const secondPadding = addPadding(prices[1][2].length);
  const thirdPadding = addPadding(prices[2][2].length);

  const actions = (place) => {
    return (
      <div className={classes.actions}>
        <Button
          onClick={props.onClose}
          className={`${classes.button} btn-lg`}
          variant="danger"
        >
          סגור
        </Button>
        <Button
          href={links[prices[place][0]]}
          className={`${classes.button} btn-lg`}
          variant="info"
        >
          הזמן
        </Button>
      </div>
    );
  };
  return (
    <>
      <Carousel
        className={classes.carousel}
        showThumbs={false}
        useKeyboardArrows={true}
      >
        <div>
          <p>סופר : {prices[0][0]}</p>
          <p>מחיר : {prices[0][1].toFixed(2)}</p>

          {prices[0][2].map((x) =>
            Object.keys(x)[0].includes("מבצע") ? (
              <li>
                {
                  <span className={classes.discount}>
                    {Object.keys(x)[0].slice(
                      0,
                      Object.keys(x)[0].indexOf("!") + 1
                    )}
                  </span>
                }
                {Object.keys(x)[0].slice(Object.keys(x)[0].indexOf("!") + 1)} :{" "}
                {Object.values(x)[0].toFixed(2)}
              </li>
            ) : (
              <li>
                {Object.keys(x)[0]}: {Object.values(x)[0].toFixed(2)}
              </li>
            )
          )}
          {firstPadding}
          {actions(0)}
        </div>
        <div>
          <p>סופר : {prices[1][0]}</p>
          <p>מחיר : {prices[1][1].toFixed(2)}</p>
          {prices[1][2].map((x) =>
            Object.keys(x)[0].includes("מבצע") ? (
              <li>
                {
                  <span className={classes.discount}>
                    {Object.keys(x)[0].slice(
                      0,
                      Object.keys(x)[0].indexOf("!") + 1
                    )}
                  </span>
                }
                {Object.keys(x)[0].slice(Object.keys(x)[0].indexOf("!") + 1)} :{" "}
                {Object.values(x)[0].toFixed(2)}
              </li>
            ) : (
              <li>
                {Object.keys(x)[0]}: {Object.values(x)[0].toFixed(2)}
              </li>
            )
          )}
          {secondPadding}
          {actions(1)}
        </div>
        <div>
          <p>סופר : {prices[2][0]}</p>
          <p>מחיר : {prices[2][1].toFixed(2)}</p>
          {prices[2][2].map((x) =>
            Object.keys(x)[0].includes("מבצע") ? (
              <li>
                {
                  <span className={classes.discount}>
                    {Object.keys(x)[0].slice(
                      0,
                      Object.keys(x)[0].indexOf("!") + 1
                    )}
                  </span>
                }
                {Object.keys(x)[0].slice(Object.keys(x)[0].indexOf("!") + 1)} :{" "}
                {Object.values(x)[0].toFixed(2)}
              </li>
            ) : (
              <li>
                {Object.keys(x)[0]}: {Object.values(x)[0].toFixed(2)}
              </li>
            )
          )}
          {thirdPadding}
          {actions(2)}
        </div>
      </Carousel>
    </>
  );
};
export default Result;
