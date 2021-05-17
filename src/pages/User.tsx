import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Input, Table } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import userService from "../services/userService";

interface IsEditable {
  status: boolean;
  rowId: number | null | string;
}

interface EditableFields {
  firstname: string;
  lastname: string;
  location: string;
  age: string;
  email: string;
}

const User = () => {
  const [users, setUsers] = useState<any>([]);
  const [isEditable, setIsEditable] = useState<IsEditable>({
    status: false,
    rowId: null,
  });
  const [editableFields, setEditableFields] = useState<EditableFields>({
    firstname: "",
    lastname: "",
    location: "",
    age: "",
    email: "",
  });

  const { logout } = useContext(AuthContext);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await userService.getAll("/users");
    console.log(data);
    setUsers(data);
  };

  const deleteUser = async (id: number) => {
    const data = await userService.delete("/users", id);
    console.log(data);
    setUsers(data);
  };

  const handleEditableFieldsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEditableFields((prev: EditableFields) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEditableStatus = () => {
    setIsEditable((prev: IsEditable) => ({
      ...prev,
      status: !prev.status,
    }));
  };

  const editUser = ({
    id,
    age,
    firstname,
    lastname,
    location,
    email,
  }: {
    id: string;
    age: string;
    firstname: string;
    lastname: string;
    location: string;
    email: string;
  }) => {
    console.log(id);
    setIsEditable((prev: IsEditable) => ({ rowId: id, status: !prev.status }));
    setEditableFields((prev: EditableFields) => ({
      ...prev,
      firstname,
      lastname,
      location,
      email,
      age,
    }));
  };

  //   <Button
  //   color="danger"
  //   onClick={() => {
  //     logout();
  //     history.push("/login");
  //   }}
  // >
  //   LOG OUT
  // </Button>

  const history = useHistory();

  return (
    <Table hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
          <th>Location</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user: any) => {
          const { status, rowId } = isEditable;
          const { firstname, lastname, email, location, age } = editableFields;
          return (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>
                {status && rowId === user.id ? (
                  <input
                    value={firstname}
                    name="firstname"
                    onChange={handleEditableFieldsChange}
                  />
                ) : (
                  user.firstname
                )}
              </td>
              <td>
                {status && rowId === user.id ? (
                  <input
                    value={lastname}
                    name="lastname"
                    onChange={handleEditableFieldsChange}
                  />
                ) : (
                  user.lastname
                )}
              </td>
              <td>
                {status && rowId === user.id ? (
                  <input
                    value={email}
                    name="email"
                    onChange={handleEditableFieldsChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {status && rowId === user.id ? (
                  <input
                    value={location}
                    name="location"
                    onChange={handleEditableFieldsChange}
                  />
                ) : (
                  user.location
                )}
              </td>
              <td>
                {status && rowId === user.id ? (
                  <input
                    value={age}
                    name="age"
                    onChange={handleEditableFieldsChange}
                  />
                ) : (
                  user.age
                )}
              </td>
              <td>
                {status && rowId === user.id ? (
                  <>
                    <Button color="success" size="sm">
                      SAVE
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={toggleEditableStatus}
                    >
                      CANCEL
                    </Button>
                  </>
                ) : (
                  <Button color="warning" onClick={() => editUser(user)}>
                    EDIT
                  </Button>
                )}
                <Button color="danger" onClick={() => deleteUser(user.id)}>
                  DEL
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default User;
