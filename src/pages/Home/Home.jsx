import { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { getHomePageContent } from "../../services/products-api";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Carousel from "../../components/Home/Carousel/Carousel";

const Home = ({ showOutOfStock, setProductData }) => {
    const [popular, setPopular] = useState([]);
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const setProduct = (product) => {
        setProductData({ ...product });
    };

    useEffect(() => {
        const getContent = async () => {
            try {
                setIsLoading(true);
                const response = await getHomePageContent();
                setPopular(response.data.popular);
                setSales(response.data.hotSales);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getContent();
    }, [showOutOfStock]);

    return (
        <div className={classes.home}>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    {popular.length > 0 && (
                        <Carousel
                            items={popular}
                            title={"מוצרים פופולריים"}
                            onProductClick={setProduct}
                        />
                    )}
                    {sales.length > 0 && (
                        <Carousel
                            items={sales}
                            title={"מבצעים שווים"}
                            onProductClick={setProduct}
                            hotSale
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
