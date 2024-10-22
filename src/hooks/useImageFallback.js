import { useState } from "react";

const useImageFallback = (images) => {
    const [hasError, setHasError] = useState(false);

    const handleImageError = () => {
        setHasError(true);
    };

    const currentImage =
        hasError || images.length === 0
            ? "https://d226b0iufwcjmj.cloudfront.net/global/frontend-icons/missing-image.png"
            : images[0];

    return [currentImage, handleImageError];
};

export default useImageFallback;
