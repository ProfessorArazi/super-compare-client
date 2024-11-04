import React, { useState } from "react";
import classes from "./AuthForm.module.css";
import Modal from "../../../UI/Modal/Modal";
import { signin, signup } from "../../../../services/auth-api";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import Logo from "../Logo/Logo";
import { useDispatch } from "react-redux";
import { setFavorites } from "../../../../store/Favorites/favoritesSlice";

const AuthForm = ({ isOpen, onClose, isVerified, setIsVerified }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("login");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const signinHanlder = async (e) => {
        e.preventDefault();
        try {
            const user = { email, password };
            setErrorMessage(null);

            setIsLoading(true);
            const response = await signin(user);

            if (response?.data?.token) {
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.token)
                );

                dispatch(setFavorites(response.data.favorites));
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
        } finally {
            setIsLoading(false);
        }
    };

    const signupHanlder = async (e) => {
        e.preventDefault();
        try {
            const user = { email, password };
            setErrorMessage(null);

            setIsLoading(true);
            const response = await signup(user);

            if (response?.data?.id) {
                setSuccessMessage(
                    "מצויין! שלחנו לך מייל עם אימות סיסמה, נשאר רק לאשר אותו ואפשר להתחיל"
                );
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
        } finally {
            setIsLoading(false);
        }
    };

    const toggleType = () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        setIsVerified(false);
        setType((prevType) => (prevType === "login" ? "register" : "login"));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {isLoading ? (
                <div className="loading">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={classes.formContainer}>
                    <form
                        onSubmit={
                            type === "login" ? signinHanlder : signupHanlder
                        }
                    >
                        {isVerified && (
                            <div className={classes.successMessage}>
                                המשתמש אומת בהצלחה
                            </div>
                        )}
                        <div className={classes["logo-container"]}>
                            <Logo />
                        </div>
                        {errorMessage && (
                            <div className={classes.errorMessage}>
                                {errorMessage}
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
                            {type === "login" ? "התחברות" : "הרשמה"}
                        </button>
                    </form>

                    <div className={classes.toggleText}>
                        {type === "login" ? "לא נרשמת עדיין?" : "יש לך משתמש?"}{" "}
                        <button
                            type="button"
                            onClick={toggleType}
                            className={classes.toggleButton}
                        >
                            {type === "login" ? "להרשמה" : "להתחברות"}
                        </button>
                    </div>
                    {successMessage && (
                        <div className={classes.successMessage}>
                            {successMessage}
                        </div>
                    )}
                </div>
            )}
        </Modal>
    );
};

export default AuthForm;
