import React from "react";

const AdminFilterBar = ({
  search,
  onSearchChange,
  perPage,
  onPerPageChange,
  onAddNew,
  addNewText = "Add New",
  filters = [],
  onFilterChange,
}) => {
  return (
    <div
      className="admin-filter-bar mb-4"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        padding: "1rem",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{ display: "flex", gap: "0.75rem", flex: 1, minWidth: "300px" }}
      >
        <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
          <i
            className="fas fa-search"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          ></i>
          <input
            type="text"
            placeholder="Search records..."
            className="form-control"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: "35px", borderRadius: "8px" }}
          />
        </div>

        <select
          className="form-control"
          value={perPage}
          onChange={(e) => onPerPageChange(e.target.value)}
          style={{ width: "130px", borderRadius: "8px" }}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>

        {filters.map((filter, index) => (
          <select
            key={index}
            className="form-control"
            value={filter.value}
            onChange={(e) => onFilterChange(filter.name, e.target.value)}
            style={{ width: "140px", borderRadius: "8px" }}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      <button
        className="btn btn-gradient"
        onClick={onAddNew}
        style={{
          height: "42px",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <i className="fas fa-plus"></i> {addNewText}
      </button>
    </div>
  );
};

export default AdminFilterBar;
