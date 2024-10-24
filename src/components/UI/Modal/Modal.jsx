import ReactDOM from "react-dom";

import classes from "./Modal.module.css";
import { useEffect } from "react";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <button className={classes["close-button"]} onClick={props.onClose}>
                &times;
            </button>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    useEffect(() => {
        document.body.style.overflow = props.isOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [props.isOpen]);

    if (!props.isOpen) return null;

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay onClose={props.onClose}>
                    {props.children}
                </ModalOverlay>,
                portalElement
            )}
        </>
    );
};

export default Modal;
