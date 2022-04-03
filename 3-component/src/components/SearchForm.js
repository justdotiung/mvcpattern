import React from "react";

const SearchForm = ({ value, onSubmit, onReset, onChange }) => {
  const handleSubmit = (e) => {
    onSubmit(e);
  };

  const handleReset = () => {
    onReset();
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        autoFocus
        value={value}
        onChange={handleChange}
      />
      {value.length > 0 && <button type="reset" className="btn-reset"></button>}
    </form>
  );
};

export default SearchForm;
