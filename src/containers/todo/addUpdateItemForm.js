// addItemForm.js
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Material UI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Ant Design
import { Drawer } from "antd";

export default function AddUpdateItemForm({ onAddItem, onEditItem, updateItem, isEditing, openForm, closeForm }) {
  const [item, setItem] = useState(updateItem);

  useEffect(() => {
    if (isEditing === true) {
      if (updateItem) {
        setItem(updateItem);
      }
    }
    handleSetValue();
  }, [updateItem]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required.")
      .min(6, "Title must be at least 6 characters.")
      .max(40, "Title must not exceed 40 characters."),
    description: Yup.string()
      .required("Description is required.")
      .min(6, "Description must be at least 6 characters.")
      .max(40, "Description must not exceed 40 characters."),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    if (isEditing === true) {
      onEditItem(data, updateItem._id);
    } else {
      onAddItem(data);
      handleSetValue();
    }
    closeForm();
  };

  const handleSetValue = async () => {
    if (isEditing == true) {
      setValue("title", updateItem?.title);
      setValue("description", updateItem?.description);
    } else if (isEditing === false) {
      setValue("title", "");
      setValue("description", "");
    }
  };

  return (
    <Drawer
      title={isEditing === true ? "Update Todo" : "Create New Todo"}
      width={720}
      onClose={closeForm}
      open={openForm}
      maskClosable={false}
      bodyStyle={{
        paddingBottom: 80,
        zIndex: 9999,
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              type="text"
              autoComplete="title"
              autoFocus
              error={errors.title ? true : false}
            />
          )}
        ></Controller>

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              type="text"
              autoComplete="description"
              autoFocus
              error={errors.description ? true : false}
            />
          )}
        ></Controller>
        <Typography variant="caption" color="error">
          {errors.username?.message}
        </Typography>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {isEditing === true ? "Update" : "Create"}
        </Button>
      </Box>
    </Drawer>
  );
}
