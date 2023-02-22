import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";


import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

import { Link } from "react-router-dom";



const ListPersons = () => {
  const dispatch = useDispatch();
  const { personsState } = useSelector((state) => state);

  const [willDeletePerson, setWillDeletePerson] = useState(false)

  /*const [searchText, setSearchText] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(personsState.persons);

  useEffect(() => {
    console.log(searchText);
    const temp = personsState.persons.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) === true ||
        item.surname.toLowerCase().includes(searchText.toLowerCase()) === true
    );
    setFilteredPersons(temp);
  }, [searchText]);*/

  const deletePerson = (id) => {
    dispatch({ type: actionTypes.personActions.DELETE_PERSON_START });
    api
      .delete(`${urls.persons}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.personActions.DELETE_PERSON_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.personActions.DELETE_PERSON_FAIL,
          payload: "Kişi silerken hata oluştu",
        });
      });
  };

  return (
    <div className="my-5">
      <div className="d-flex justify-content-end mx-5">
        
        <Link to={"/add-person"} className="btn btn-primary">Add Person</Link>
      </div>
      <table className="table table-striped mx-2">
        <thead>
          <tr>
            <th scope="col"> No</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email Address</th>
            <th scope="col">Process</th>
          </tr>
        </thead>
        <tbody>
          {personsState.persons.map((person, index) => {

            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{person.name}</td>
                <td>{person.surname}</td>
                <td>{person.phoneNumber}</td>
                <td>{person.emailAddress}</td>
                <td>
                  <button
                    onClick={() => {
                      deletePerson(person.id)

                      setWillDeletePerson(true)
                    }}
                    className="btn btn-danger">
                    Delete
                  </button>
                  <Link to={`/edit-person/${person.id}`} className="btn btn-primary">Edit</Link>


                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default ListPersons;

/*<input
          className="form-control w-75"
          type="text"
          placeholder="Aramak istediğiniz kişinin ismini girin..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />*/