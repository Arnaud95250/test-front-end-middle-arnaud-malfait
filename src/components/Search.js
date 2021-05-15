const Search = ({ searchBeer }) => {
  return (
    <div id="search">
      <input
        placeholder="SEARCH"
        onChange={(event) => {
          searchBeer(event.target.value);
        }}
      />
    </div>
  );
};

export default Search;
