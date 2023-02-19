import React, { useState } from "react";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

const EditPerson = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { personsState } = useSelector((state) => state);
    const myPerson = personsState.persons.find((item) => item.id === params.personId);
    //console.log(myPerson);
    const [form, setForm] = useState(myPerson);
    console.log(myPerson);
    const handleSubmit = (event) => {
        event.preventDefault();
        /* validation */
        if (form.name === "" || form.surname === "" || form.phoneNumber === "" || form.emailAddress === "") {
            alert("isim, soyisim, telefon numarası ve email adresi alanı zorunludur");
            return;
        }


        api
            .put(`${urls.persons}/${params.personId}`, form)
            .then((res) => {
                dispatch({ type: actionTypes.personActions.EDIT_PERSON, payload: form });
                navigate("/")
            })
            .catch((err) => { });
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
                            placeholder="05323216598"
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
                            id="emailAddress"
                            placeholder="akilic@gmail.com"
                            value={form.emailAddress}
                            onChange={(event) =>
                                setForm({ ...form, emailAddress: event.target.value })
                            }
                        />
                    </div>



                    <div className="d-flex justify-content-center my-5">
                        <button className="btn btn-primary w-50" type="submit">
                            Güncelle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPerson;