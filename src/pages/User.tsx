import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Table } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import userService from "../services/userService";

const User = () => {
  const [users, setUsers] = useState<any>([]);
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await userService.getAll("/usrs");
    console.log(data);
    setUsers(data);
  };

  const deleteUser = async (id: number) => {
    const data = await userService.delete("/users", id);
    console.log(data);
    setUsers(data);
  };

  const editUser = (id: number) => {
    console.log(id);
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
    <Table>
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
        {users?.map((user: any) => (
          <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.location}</td>
            <td>{user.age}</td>
            <td>
              <Button color="warning" onClick={() => editUser(user.id)}>
                EDIT
              </Button>
              <Button color="danger" onClick={() => deleteUser(user.id)}>
                DEL
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default User;
