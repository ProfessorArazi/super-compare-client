import { useState } from "react";

const useImageFallback = (images) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageError = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex((prevIndex) => prevIndex + 1);
        }
    };

    return [
        images?.length > 0 ? images[currentImageIndex] : "",
        handleImageError,
    ];
};

export default useImageFallback;
