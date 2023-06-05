import { useRef, useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const TrigerSearch = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    handleSearch(query);
  };

  return (
    <InputGroup size="md">
      <Input
        type="text"
        value={query}
        onKeyDown={TrigerSearch}
        onChange={(e) => handleChange(e)}
        placeholder="search..."
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          Go
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
