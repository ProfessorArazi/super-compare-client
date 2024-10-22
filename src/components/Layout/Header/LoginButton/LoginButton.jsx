import LoginIcon from "../../../../assets/LoginIcon";

const LoginButton = ({ isLoggedIn, openLoginHandler, showFavorites }) => {
    return (
        <div onClick={!isLoggedIn ? openLoginHandler : showFavorites}>
            <LoginIcon />
        </div>
    );
};

export default LoginButton;
