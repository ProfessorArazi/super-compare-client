import LoginIcon from "../../../../assets/LoginIcon/LoginIcon";

const LoginButton = ({
    isLoggedIn,
    openLoginHandler,
    showFavorites,
    isMobile,
}) => {
    return (
        <div onClick={!isLoggedIn ? openLoginHandler : showFavorites}>
            <LoginIcon isMobile={isMobile} />
        </div>
    );
};

export default LoginButton;
