import React from 'react'
import './../design.css'
import { Input } from 'reactstrap';
import { Search } from 'react-feather'


const SearchBar = ({ handleSearch }) => {

    const handleChange = (event) => {
      const value = event.target.value.trim();
      handleSearch(value);
    };


  return (
    <div className='searchBar'>
        <Input 
        type="text" 
        name="box"
        placeholder="Search Anything you want..."
        className="inputSearch"
        onChange={handleChange}
        ></Input>
        <Search size={20} className='searchIcon'/>
    </div>
  )
}

export default SearchBar;

