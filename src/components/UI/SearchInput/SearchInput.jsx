import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchInput.module.css";
import { fetchProductsBySubject } from "../../../services/products-api";
import SearchIcon from "../../../assets/SearchIcon";

export const SearchInput = ({ setProductData, closeAll, isMobile }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [value, setValue] = useState("");
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const listRef = useRef();

    const navigate = useNavigate();

    const searchHandler = async (value) => {
        try {
            const response = await fetchProductsBySubject(value, 1, 10);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const resetSearchHandler = () => {
        setSearchResults([]);
    };

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        if (event.key === "Enter") {
            showAllResults(inputValue);
        } else if (inputValue.length < 2) {
            resetSearchHandler();
        } else {
            const timeoutId = setTimeout(() => {
                searchHandler(inputValue);
            }, 300);

            setTypingTimeout(timeoutId);
            setShowResults(true);
        }
    };

    const showAllResults = (subject) => {
        setShowResults(false);
        resetSearchHandler();
        closeAll();
        navigate(`/products/${subject}`);
    };

    const setProduct = (result) => {
        setProductData({ ...result });
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (listRef.current && !listRef.current.contains(event.target)) {
                resetSearchHandler();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [listRef]);

    return (
        <div ref={listRef} className={classes.search}>
            <div className={classes["input-container"]}>
                <input
                    className={`${classes.input} ${
                        showResults && searchResults.length > 0
                            ? classes["input-active"]
                            : ""
                    }`}
                    name="search"
                    value={value}
                    type="text"
                    placeholder={
                        isMobile ? "חיפוש" : "חיפוש פריט, קטגוריה או מותג..."
                    }
                    onClick={handleChange}
                    onChange={handleChange}
                    onKeyDown={handleChange}
                />
                <button
                    className={`${classes["search-button"]} ${
                        classes["btn-mobile"]
                    } ${
                        showResults && searchResults.length > 0
                            ? classes["input-active"]
                            : ""
                    } `}
                    onClick={() => showAllResults(value)}
                >
                    {isMobile ? "" : "חיפוש"} <SearchIcon />
                </button>
            </div>

            {showResults && searchResults.length > 0 && (
                <div className={classes["links-card"]}>
                    <ul onClick={resetSearchHandler}>
                        {searchResults.map((result, index) => (
                            <li onClick={() => setProduct(result)} key={index}>
                                {result.name}
                            </li>
                        ))}
                    </ul>
                    <button
                        className={classes["result-btn"]}
                        onClick={() => showAllResults(value)}
                    >
                        לכל התוצאות
                    </button>
                </div>
            )}
        </div>
    );
};
