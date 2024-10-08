import classes from "./Footer.module.css";
import { Helmet } from "react-helmet";

const Footer = () => {
    return (
        <>
            <Helmet>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />

                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"
                />
                <link rel="stylesheet" href="assets/css/style.css"></link>
            </Helmet>

            <div className={classes["footer-basic"]}>
                <footer>
                    <div className={classes.logo}>
                        <h4>Super Compare</h4>
                    </div>

                    <p className={classes.copyright}>Amit Arazi © 2021</p>
                </footer>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
        </>
    );
};

export default Footer;
