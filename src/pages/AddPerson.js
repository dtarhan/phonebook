import React, { useState } from "react";

import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";

const AddPerson = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { personsState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
    surname: "",
    phoneNumber: "",
    emailAddress: "",
    
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    /* validation */
    if (form.name === "" || form.surname === "" || form.phoneNumber === "" || form.emailAddress === "") {
      alert("isim, soyisim, telefon numarası ve email adresi alanı zorunludur");
      return;
    }
    

    /* request to api && dispatch store */
    api
      .post(urls.persons, form)
      .then((res) => {
        dispatch({
          type: actionTypes.personActions.ADD_PERSON,
          payload: form,
        });
        navigate("/")
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Ahmet"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Surname
            </label>
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="Kılıç"
              value={form.surname}
              onChange={(event) =>
                setForm({ ...form, surname: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              placeholder="05337894512"
              value={form.phoneNumber}
              onChange={(event) =>
                setForm({ ...form, phoneNumber: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailAddress" className="form-label">
              Email Address
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="ahmetkilic@hotmail.com"
              value={form.emailAddress}
              onChange={(event) =>
                setForm({ ...form, emailAddress: (event.target.value) })
              }
            />
          </div>
          
          

          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPerson;
