import React, {useState, Fragment} from 'react'
import MetaData from '../layout/MetaData';
import './Search.css';

const Search = ({history}) => {

    const [keyword, setKeyword] = useState();

    const searchHandler = e => {
        e.preventDefault();

        if(keyword.trim()){
            history.push(`/products/${keyword}`);
        }else {
            history.push(`/products`);
        }
    }

    return (
        <Fragment>
            <MetaData title="Search..." />
            <form className="searchBox" onSubmit={searchHandler}>
                <input type="text" placeholder="Search..." onChange={e => setKeyword(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    )
}

export default Search
