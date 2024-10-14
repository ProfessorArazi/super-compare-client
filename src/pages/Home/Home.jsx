import classes from "./Home.module.css";

const Home = () => {
    return (
        <div className={classes.home}>
            <h2>ברוכים הבאים לSuper Compare</h2>
            <p>
                האתר שיעזור לכם להשוות מחירים בין סופרים שונים, ולבחור את
                האפשרות הטובה ביותר עבור הרכישה שלכם.
            </p>

            <h3>איך לאפשר יצירת עגלת קניות בצורה אוטומטית באתר הסופר הנבחר?</h3>
            <ol>
                <li>
                    התקינו את{" "}
                    <a
                        href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        tampermonkey
                    </a>{" "}
                    בדפדפן שלכם.
                </li>
                <li>
                    הוסיפו את{" "}
                    <a
                        href="https://greasyfork.org/scripts/512078-super-compare-cart/code/Super%20Compare%20Cart.user.js"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        הסקריפט
                    </a>
                    .
                </li>
                <li>התחילו להוסיף פריטים לעגלה.</li>
                <li>
                    כשסיימתם, לחצו על אייקון העגלה ולאחר מכן לחצו על{" "}
                    <strong>"השוואה"</strong> כדי לראות את ההבדלים במחירים בין
                    הסופרים הנתמכים.
                </li>
                <li>
                    לאחר שמצאתם את הסופר המתאים לכם, לחצו על{" "}
                    <strong>"הזמנה"</strong>, והסקריפט ייצור אוטומטית את העגלה
                    עבורכם באתר הסופר הנבחר.
                </li>
            </ol>
            <p>
                הסקריפט יוסיף את הפריטים הנבחרים לעגלת הקניות שלכם באתר הסופר
                ויחיל את כל ההנחות הזמינות באופן אוטומטי.
            </p>
        </div>
    );
};

export default Home;
