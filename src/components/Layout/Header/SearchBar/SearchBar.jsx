import { SearchInput } from "../../../UI/SearchInput/SearchInput";
import classes from "./SearchBar.module.css";

const SearchBar = ({ closeAll, isMobile, setProductData }) => {
    return (
        <div className={classes["search-container"]}>
            <SearchInput
                closeAll={closeAll}
                isMobile={isMobile}
                setProductData={setProductData}
            />
        </div>
    );
};

export default SearchBar;
