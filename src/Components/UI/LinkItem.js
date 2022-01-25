import classes from "./LinkItem.module.css";
import { HashLink } from "react-router-hash-link";

const LinkItem = (props) => {
  return (
    <HashLink className={classes.link} to={props.link}>
      <li className={classes["link-item"]}>
        <img className={classes.img} src={props.img} alt={props.name} />
        <p className={classes.name}>{props.name}</p>
      </li>
    </HashLink>
  );
};
export default LinkItem;
