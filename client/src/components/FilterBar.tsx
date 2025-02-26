import React from 'react';
import '../styles/FilterBar.css'

interface FilterBarProps {
    setCategory: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setCategory }) => {

    const handleCategoryChange = (category: string) => {
        setCategory(category);
    }

    return (
        <div className="filter-bar">
            <button onClick={() => handleCategoryChange('general')}>General</button>
            <button onClick={() => handleCategoryChange('business')}>Business</button>
            <button onClick={() => handleCategoryChange('technology')}>Technology</button>
            <button onClick={() => handleCategoryChange('sports')}>Sports</button>
            <button onClick={() => handleCategoryChange('entertainment')}>Entertainment</button>
            <button onClick={() => handleCategoryChange('health')}>Health</button>
            <button onClick={() => handleCategoryChange('science')}>Science</button>
        </div>

    )
}

export default FilterBar;
