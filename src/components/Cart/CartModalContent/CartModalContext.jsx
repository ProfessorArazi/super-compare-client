import CartItems from "../CartItems/CartItems";
import CartActions from "../CartActions/CartActions";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import classes from "./CartModalContent.module.css";

const CartModalContent = ({
    items,
    onRemove,
    onAdd,
    onClear,
    onCompare,
    isLoading,
    hasItems,
    onClose,
}) => {
    return (
        <>
            {!isLoading ? (
                <>
                    <CartItems
                        items={items}
                        onRemove={onRemove}
                        onAdd={onAdd}
                    />
                    {!hasItems && (
                        <h5 className={classes.empty}>הוסף מוצרים לעגלה</h5>
                    )}
                    <CartActions
                        hasItems={hasItems}
                        onClear={onClear}
                        onCompare={onCompare}
                        onClose={onClose}
                    />
                </>
            ) : (
                <div className={classes.loading}>
                    <LoadingSpinner />
                </div>
            )}
        </>
    );
};

export default CartModalContent;
