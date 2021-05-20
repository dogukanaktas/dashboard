import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Alert,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import userService from "../services/userService";
import { Users } from "../types/types";

export interface IsEditable {
  status: boolean;
  rowId: number | null | string;
}

export interface EditableFields {
  id?: number | string;
  firstname: string;
  lastname: string;
  location: string;
  age: string;
  email: string;
}

export interface Modals {
  save: boolean;
  delete: boolean;
}

export interface Alerts {
  success: boolean;
  successMessage: string | null;
  fail: boolean;
  failMessage: string | null;
}

const User = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
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
  const [modals, setModals] = useState<Modals>({
    save: false,
    delete: false,
  });
  const [alerts, setAlerts] = useState<Alerts>({
    success: false,
    successMessage: null,
    fail: false,
    failMessage: null,
  });
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  const { logout } = useContext(AuthContext);

  const getUsers = async () => {
    const data = await userService.getAll();
    console.log(data)
    setUsers(data);
  };

  const addUser = async () => {
    const request = await userService.patch(userId, editableFields);
    const {
      status,
      statusText,
      data: { firstname, lastname },
    } = request;

    if (status === 200 && statusText === "OK") {
      setAlerts((prev: Alerts) => ({
        ...prev,
        success: true,
        successMessage: `${firstname} ${lastname}'s information has been updated successfully.`,
      }));
      toggleEditableStatus();
      getUsers();
      setModals((prev: Modals) => ({ ...prev, save: false, delete: false }));
    } else {
      setAlerts((prev: Alerts) => ({
        ...prev,
        fail: true,
        failMessage: `${firstname} ${lastname}'s information could not be saved`,
      }));
      setModals((prev: Modals) => ({ ...prev, save: false, delete: false }));
    }
  };

  const deleteUser = async () => {
    await userService.delete(userId);

    setAlerts((prev: Alerts) => ({
      ...prev,
      success: true,
      successMessage: `User successfully deleted`,
    }));
    setModals((prev: Modals) => ({ ...prev, delete: false }));
    getUsers();
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

  return (
    <>
      <Button
        color="danger"
        onClick={() => {
          logout();
          history.push("/login");
        }}
      >
        LOG OUT
      </Button>
      <Alert
        color="success"
        isOpen={alerts.success}
        toggle={() =>
          setAlerts((prev: Alerts) => ({ ...prev, success: !prev.success }))
        }
      >
        {alerts.successMessage}
      </Alert>
      <Alert
        color="danger"
        isOpen={alerts.fail}
        toggle={() =>
          setAlerts((prev: Alerts) => ({ ...prev, fail: !prev.fail }))
        }
      >
        {alerts.failMessage}
      </Alert>
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
            const { firstname, lastname, email, location, age } =
              editableFields;
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
                      <Button
                        color="success"
                        size="sm"
                        onClick={() => {
                          setUserId(user.id);
                          setModals((prev: Modals) => ({
                            ...prev,
                            save: true,
                          }));
                        }}
                      >
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
                  <Button
                    color="danger"
                    onClick={() => {
                      setUserId(user.id);
                      setModals((prev: Modals) => ({ ...prev, delete: true }));
                    }}
                  >
                    DEL
                  </Button>
                </td>
              </tr>
            );
          })}
          <Modal
            isOpen={modals.save}
            toggle={() =>
              setModals((prev: Modals) => ({ ...prev, save: !prev.save }))
            }
            centered
            autoFocus
            size="sm"
          >
            <ModalHeader>Do you want to save the changes?</ModalHeader>
            <ModalFooter style={{ display: `flex`, justifyContent: `center` }}>
              <Button color="success" onClick={addUser}>
                SAVE
              </Button>
              <Button
                color="danger"
                onClick={() =>
                  setModals((prev: Modals) => ({ ...prev, save: !prev.save }))
                }
              >
                CANCEL
              </Button>
            </ModalFooter>
          </Modal>

          <Modal
            isOpen={modals.delete}
            toggle={() =>
              setModals((prev: Modals) => ({ ...prev, delete: !prev.delete }))
            }
            centered
            autoFocus
            size="sm"
          >
            <ModalHeader>Do you want to delete the user?</ModalHeader>
            <ModalFooter className="d-flex justify-content-center">
              <Button color="primary" onClick={deleteUser}>
                DELETE
              </Button>
              <Button
                color="danger"
                onClick={() =>
                  setModals((prev: Modals) => ({
                    ...prev,
                    delete: !prev.delete,
                  }))
                }
              >
                CANCEL
              </Button>
            </ModalFooter>
          </Modal>
        </tbody>
      </Table>
    </>
  );
};

export default User;
