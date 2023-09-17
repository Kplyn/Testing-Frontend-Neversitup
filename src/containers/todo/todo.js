import React, { useState, useEffect, useCallback } from "react";
import apiEndpoint from "../../utils/apiEndpoint";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, deleteTodo } from "../../store/todo/todoAction";
import AddUpdateItemForms from "./addUpdateItemForm";
import ItemList from "./itemList";
import EmptyItem from "../../components/itemEmpty";
import Loading from "../../components/loading";
import { ssoLoginData } from "../../store/ssoLogin/ssoLoginAction";
import { msg, hed, btn } from "../..//utils/popup";
import Swal from "sweetalert2";

// Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function Todos({ todo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.sso).token;
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [openCreate, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(todo);

  useEffect(() => {
    if (!token) {
      navigate(`/`);
    } else {
      handleGetData(token).catch((error) => {
        console.log(error);
      });
    }
  }, []);

  const handleGetData = useCallback(
    async (data) => {
      if (data) {
        try {
          let getTodoRes = await apiEndpoint.getTodos(data);
          if (getTodoRes.status == 200) {
            dispatch(addTodo(getTodoRes.data));
            setItems(getTodoRes.data);
          } else {
            dispatch(ssoLoginData(null));
            Swal.fire({
              icon: "error",
              title: hed.warning,
              text: msg.txtFail,
              confirmButtonText: btn.retry,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [items]
  );

  const handleAddItem = async (data) => {
    let param = {
      title: data.title || "",
      description: data.description || "",
    };
    try {
      let addItemRes = await apiEndpoint.addTodos(param, token);
      if (addItemRes.status == 200) {
        setItems([data]);
        dispatch(addTodo(addItemRes.data));
        setIsEditing(false);
        handleGetData(token);
      } else {
        Swal.fire({
          icon: "error",
          title: hed.warning,
          text: msg.txtFail,
          confirmButtonText: btn.retry,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditItem = async (value, id) => {
    setIsEditing(true);
    setUpdatedItem(value);
    setOpen(true);

    if (isEditing == true) {
      let param = {
        title: value.title || "",
        description: value.description || "",
      };
      try {
        let itemId = id;
        let todoRes = await apiEndpoint.updateTodos(param, itemId, token);
        if (todoRes.status == 200) {
          setLoading(true);
          dispatch(updateTodo(value));
          handleGetData(token);
          setIsEditing(false);
        } else {
          Swal.fire({
            icon: "error",
            title: hed.warning,
            text: msg.txtFail,
            confirmButtonText: btn.retry,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteItem = async (id, title) => {
    try {
      Swal.fire({
        title: hed.delete,
        text: msg.txtDelete + "" + title,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: btn.delete,
      }).then(async (result) => {
        if (result.isConfirmed) {
          let todoRes = await apiEndpoint.deleteTodos(id, token);
          if (todoRes.status == 200) {
            dispatch(deleteTodo(id));
            handleGetData(token);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          } else {
            Swal.fire({
              icon: "error",
              title: hed.warning,
              text: todoRes.data.message,
              confirmButtonText: btn.retry,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    if (isEditing === true) {
      setIsEditing(false);
    }
    handleGetData(token);
    setOpen(false);
  };

  const handleCloseLoading = async () => {
    if (loading == true) {
      setLoading(false);
    }
  };
  const handleCreateItem = async () => {
    setOpen(true);
    setUpdatedItem()
  };

  return (
    <>
      <Layout>
        <Box sx={{ mx: 2 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 15, textAlign: "center" }}
          >
            {!items ? (
              <EmptyItem />
            ) : (
              <ItemList items={items} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} />
            )}

            <AddUpdateItemForms
              onAddItem={handleAddItem}
              onEditItem={handleEditItem}
              isEditing={isEditing}
              updateItem={updatedItem}
              openForm={openCreate}
              closeForm={handleClose}
            />

            <Fab
              color="primary"
              aria-label=" Create Todo"
              variant="extended"
              onClick={handleCreateItem}
              sx={{ mt: 5, zIndex: 9 }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Create
            </Fab>
          </Grid>
        </Box>
      </Layout>

      <Loading isLoading={loading} handleCloseLoading={handleCloseLoading} />
    </>
  );
}
