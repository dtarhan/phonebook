import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import actionTypes from "../redux/actions/actionTypes";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";


const EditPerson = () => {
    const params = useParams();
    const { personId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { personsState } = useSelector((state) => state);

    const [willEditPerson, setWillEditPerson] = useState(null);
    const [editeBasildiMi, setEditeBasildiMi] = useState(false);

    useEffect(() => {
        api
            .get(`${urls.persons}/${personId}`)
            .then((res) => {
                console.log(res.data)
                setWillEditPerson(res.data);
                
            })
            .catch((err) => {
                alert("İlgili öğrenci bilgilerini çekerken bir hata oluştu.");
                
            });
    }, []);

    const [updatedPerson, setupdatedPerson] = useState({
        ...personsState.id,
        id: String(new Date().getTime()),
        name: "",
        surname: "",
        phoneNumber: "",
        emailAddress: ""

    });

    const HandleEdit = (event) => {
        event.preventDefault();
        
        if (updatedPerson.name === "" || updatedPerson.surname === "" || updatedPerson.phoneNumber === "" || updatedPerson.emailAddress === "") {
            alert("isim, soyisim, telefon numarası ve email adres alanlarını girmek zorunludur");
            return;
        }
        
        dispatch({ type: actionTypes.personActions.EDIT_PERSON_START, payload: personsState.persons })
        setEditeBasildiMi(false)

        api
            .put(`${urls.persons}/${personId}`)
            .then((res) => {
                dispatch({
                    type: actionTypes.personActions.EDIT_PERSON_SUCCESS,
                    payload: updatedPerson,
                  
                });
                navigate("/")
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.personActions.EDIT_PERSON_FAIL,
                    payload: "Kişi eklerken hata oluştu",
                });
            });
        
    };


    if (willEditPerson === null) {
        return null;
    }

    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={HandleEdit}>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Ör: Ahmet"
                            value={updatedPerson.name}
                            onChange={(event) => setupdatedPerson({ ...updatedPerson, name: event.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">
                            surname
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="surname"
                            placeholder="Ör: Kılıç"
                            value={updatedPerson.surname}
                            onChange={(event) => setupdatedPerson({ ...updatedPerson, surname: event.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="PhoneNumber" className="form-label">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="PhoneNumber"
                            placeholder="Ör: 05331236598"
                            value={updatedPerson.phoneNumber}
                            onChange={(event) => setupdatedPerson({ ...updatedPerson, phoneNumber: event.target.value })}
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="EmailAddress" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="emailAdress"
                            placeholder="Ör: akilic@hotmail.com"
                            value={updatedPerson.emailAddress}
                            onChange={(event) => setupdatedPerson({ ...updatedPerson, emailAddress: event.target.value })}
                        />
                    </div>

                    <div className="d-flex justify-content-center my-5">
                        <button type="submit" className="btn btn-outline-primary w-50"
                            onClick={() => setEditeBasildiMi(true)}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default EditPerson;