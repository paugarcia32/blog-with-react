import React from "react";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="searchBar">
      <Form className="d-flex">
        <FaSearch className="-icon2" />
        <Form.Control
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
        />
      </Form>
    </div>
  );
}
