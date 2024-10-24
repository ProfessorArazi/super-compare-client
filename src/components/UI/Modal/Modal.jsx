import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import closeBtn from "../../../assets/close-btn.png";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    const modalRef = useRef();
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
        const modal = modalRef.current;
        if (modal && modal.scrollHeight > modal.clientHeight) {
            setIsScrollable(true);
        } else {
            setIsScrollable(false);
        }
    }, [props.children]);

    return (
        <div
            ref={modalRef}
            className={`${classes.modal} ${
                isScrollable ? classes["no-radius"] : ""
            }`}
        >
            <img
                className={classes["close-button"]}
                src={closeBtn}
                alt="close"
                onClick={props.onClose}
            />

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
