// pages/awesome/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import InputField from "../../atoms/formInput/formInput";
import TableComponent from "../../atoms/table/table";
import SubmitButton from "../../molecules/submitButton/submitButton";
import "./page.scss";

const defualtFormFields = {
  name: "",
};

const AwesomePage = () => {
  const [companies, setUsers] = useState([]);
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { name } = formFields;
  const [selectedRow, setSelectedRow] = useState(null); // State for tracking selected row
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    async function fetchUsers() {}
    getCompanies();
    fetchUsers();
  }, []);

  const getCompanies = async () => {
    try {
      const response = await fetch("api/companies", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      const data = await response.json();
      setUsers(data.data); // Adjust based on your API response structure
    } catch (error) {
      console.error("Error fetching companies", error);
    }
  };

  const handleRowClick = (company) => {
    setFormFields({ name: company.name });
    setSelectedRow(company._id); // Set selected row
  };

  const handleRemove = () => {
    console.log("Remove clicked");
  };

  const addCompany = async () => {
    try {
      const response = await fetch("api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      console.log(response);
    } catch (error) {
      console.error("Error adding company", error);
    }
  };

  return (
    <div>
      <div className="submit_form">
        <InputField
          label={"Ime sale"}
          type="text"
          required
          onChange={handleChange}
          name="name"
          value={name}
        />
        <SubmitButton submit={addCompany} content={"Dodaj salu"} />
      </div>
      <TableComponent
        data={companies}
        columns={["ID", "Naziv"]} // Pass column names here
        columnKeys={["_id", "name"]} // Pass column names here
        onRowClick={handleRowClick}
        selectedRow={selectedRow}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default AwesomePage;
