const Search = ({onSubmit, value, handleChange}) => {
	return (
	<form className="searchbar" onSubmit={onSubmit}>
		<input 
			type="text"
			name="search"
			value={value}
			placeholder="Search Activities"
			onChange={handleChange}
		/>
		<button type="submit">Search</button>
	</form>
	);
};

export default Search;
