import React, { useContext, useState } from "react";
import classes from "./AuthForm.module.css";
import Modal from "../UI/Modal/Modal";
import { signin, signup } from "../../services/auth-api";
import FavoritesContext from "../../store/Favorites/favorites-context";

const AuthForm = ({ onClose, isVerified, setIsVerified }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("login");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const ctx = useContext(FavoritesContext);

    const signinHanlder = async (e) => {
        e.preventDefault();
        try {
            const user = { email, password };
            setErrorMessage(null);

            const response = await signin(user);

            if (response?.data?.token) {
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.token)
                );

                ctx.setFavorites(response.data.favorites);
                onClose();
            } else {
                setSuccessMessage(null);
                setErrorMessage("משהו השתבש, נסה שוב מאוחר יותר...");
            }
        } catch (error) {
            setSuccessMessage(null);
            setErrorMessage(
                error.response?.data?.message ||
                    "משהו השתבש, נסה שוב מאוחר יותר..."
            );
        }
    };

    const signupHanlder = async (e) => {
        e.preventDefault();
        try {
            const user = { email, password };
            setErrorMessage(null);

            const response = await signup(user);

            if (response?.data?.id) {
                setSuccessMessage("נשלח אליך אימייל לאימות המשתמש");
            } else {
                setSuccessMessage(null);
                setErrorMessage("משהו השתבש, נסה שוב מאוחר יותר...");
            }
        } catch (error) {
            setSuccessMessage(null);
            setErrorMessage(
                error.response?.data?.message ||
                    "משהו השתבש, נסה שוב מאוחר יותר..."
            );
        }
    };

    const toggleType = () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        setIsVerified(false);
        setType((prevType) => (prevType === "login" ? "register" : "login"));
    };

    return (
        <Modal onClose={onClose}>
            <div className={classes.formContainer}>
                <form
                    onSubmit={type === "login" ? signinHanlder : signupHanlder}
                >
                    {isVerified && (
                        <div className={classes.successMessage}>
                            המשתמש אומת בהצלחה
                        </div>
                    )}
                    <h3 className={classes.title}>
                        {type === "login" ? "כניסה" : "הרשמה"}
                    </h3>
                    {errorMessage && (
                        <div className={classes.errorMessage}>
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className={classes.successMessage}>
                            {successMessage}
                        </div>
                    )}
                    <div className={classes.formGroup}>
                        <input
                            placeholder="אימייל"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <input
                            placeholder="סיסמה"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={classes.button}>
                        {type === "login" ? "כניסה" : "הרשמה"}
                    </button>
                </form>

                <div className={classes.toggleText}>
                    {type === "login" ? "עדיין לא רשום?" : "כבר רשום?"}{" "}
                    <button
                        type="button"
                        onClick={toggleType}
                        className={classes.toggleButton}
                    >
                        {type === "login" ? "הרשם כאן" : "התחבר כאן"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AuthForm;
