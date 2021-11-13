import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProduct,
} from "../../actions/product";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from 'react-js-pagination'; 
import { Slider, Typography } from '@mui/material';
import  MetaData from '../layout/MetaData';

import './Products.css';
import { useAlert } from "react-alert";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
]

const Products = ({match}) => {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resultsPerPage, filteredProductsCount } = useSelector(state => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);
    const alert = useAlert();

    const keyword = match.params.keyword;
    
    const setCurrentPageNo = pageNo => {
        setCurrentPage(pageNo);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    useEffect(() => {
    
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        
        dispatch(getProduct(keyword, currentPage, price, category, ratings));

    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    return (
        <Fragment>
        <MetaData title="Products" />
        {loading ? <Loader /> : 
            <Fragment>
                <h2 className="productsHeading">Products</h2>

                <div className="products">
                    {products && products.map(product => <ProductCard key={product._id} product={product} />)}
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                    
                    <Typography>Category</Typography>
                    <ul className="categoryBox">
                        { categories.map(category => (
                            <li
                                className="category-link"
                                key={category}
                                onClick={() => setCategory(category)}
                            >
                                {category}
                            </li>
                        )) }
                    </ul>

                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                            setRatings(newRating);
                        }}
                        valueLabelDisplay="auto"
                        aria-labelledby="continous-slider"
                        min={0}
                        max={5}
                    />
                    </fieldset>
                </div>

                { resultsPerPage < filteredProductsCount && <div className="paginationBox">
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resultsPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>}
            </Fragment>}
        </Fragment>
    )
}

export default Products
