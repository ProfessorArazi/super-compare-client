import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchInput.module.css";
import { Card } from "react-bootstrap";
import { fetchProductsBySubject } from "../../../services/products-api";

export const SearchInput = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [value, setValue] = useState("");
    const [typingTimeout, setTypingTimeout] = useState(null);

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
        } else if (inputValue.length < 3) {
            resetSearchHandler();
        } else {
            const timeoutId = setTimeout(() => {
                searchHandler(inputValue);
            }, 500);

            setTypingTimeout(timeoutId);
        }
    };

    const showAllResults = (subject) => {
        resetSearchHandler();
        navigate(`/products/${subject}`);
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
            <input
                className={
                    searchResults.length > 0 ? classes["input-active"] : ""
                }
                name="search"
                value={value}
                type="text"
                placeholder="חפש"
                onClick={handleChange}
                onChange={handleChange}
                onKeyDown={handleChange}
            />
            {searchResults.length > 0 && (
                <Card className={classes["links-card"]}>
                    <ul onClick={resetSearchHandler}>
                        {searchResults.map((result, index) => (
                            <li key={index}>{result.name}</li>
                        ))}
                    </ul>
                    <button onClick={() => showAllResults(value)}>
                        לכל התוצאות
                    </button>
                </Card>
            )}
        </div>
    );
};
