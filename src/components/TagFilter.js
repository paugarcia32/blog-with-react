import React from "react";
import DropdownSelect from "react-dropdown-select";

export default function TagFilter({
  tags,
  selectedTags,
  handleClearFilter,
  handleChange,
}) {
  return (
    <div className="tag-filter-container">
      <h3 className="tag-filter-title">Filter tags</h3>
      <div className="main-title-underline"></div>
      <DropdownSelect
        options={tags.map((tag) => ({ label: tag.title, value: tag._id }))}
        multi
        values={selectedTags}
        onChange={(values) => handleChange(values)}
        className="tag-select custom-dropdown-select"
        placeholder="Select tags"
      />
    </div>
  );
}
