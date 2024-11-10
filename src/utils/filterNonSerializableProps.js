export const filterNonSerializableProps = (props) => {
    return Object.fromEntries(
        Object.entries(props).filter(
            ([key, value]) => typeof value !== "function"
        )
    );
};
