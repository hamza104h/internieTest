import Button from './buttons'; // Ensure the import name matches the file
import './Itemlist.css';
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [items, setItems] = useState([]);  
  const [filter, setFilter] = useState('all');  
  const [searchTerm, setSearchTerm] = useState('');
  const [postsToShow, setPostsToShow] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setItems(data.slice(0, 20));  // Get more posts to work with
    };
    
    fetchData();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.id === parseInt(filter);
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const currentPosts = filteredItems.slice(0, postsToShow);

  return (
    <div className='container'>
      <input
        className='search-bar'
        type="text" 
        placeholder="Search by title" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <Button postsToShow={postsToShow} setPostsToShow={setPostsToShow} />

      <select 
        id="filter" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        className='filter-select'
      >
        <option value="all">All</option>
        {items.map(item => (
          <option key={item.id} value={item.id}>{item.id}</option>
        ))}
      </select>

      <ul className='post-list'>
        {currentPosts.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
