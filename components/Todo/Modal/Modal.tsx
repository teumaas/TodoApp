import React, { useState } from "react";
import { Button, Text, Modal, Input, Textarea } from "@nextui-org/react";
import { BiNotepad, BiSave, BiEdit } from "react-icons/bi";

import { ITodoItem } from "../../../interfaces/ITodoItem";
import Router from "next/router";

const TodoModal = ({ id, state, post }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);

  const openHandler = () => {
    setVisible(true);
  };
  const closeHandler = () => {
    setVisible(false);
  };

  const postItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, description };
      await fetch(`/api/item/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setVisible(false);
      await Router.push("/");
    } catch (error) {}
  };

  const updateItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, description };
      await fetch(`/api/item/update/${id}`, {
        method: "UPDATE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setVisible(false);
      await Router.push("/");
    } catch (error) {}
  };

  return (
    <Modal
      key={id}
      closeButton
      blur
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          <Text b size={18}>
            {post ? (
              <Text>
                <BiNotepad /> Add Todo
              </Text>
            ) : (
              <Text>
                <BiNotepad /> Edit Todo
              </Text>
            )}
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          bordered
          fullWidth
          color="primary"
          size="lg"
          cols={50}
          rows={8}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer justify="center">
        {post ? (
          <Button
            rounded
            type="submit"
            size="md"
            onClick={postItem}
            disabled={!description || !title}
            icon={<BiSave size="25px" />}
          >
            Add
          </Button>
        ) : (
          <Button
            rounded
            type="submit"
            size="md"
            onClick={updateItem}
            disabled={!description || !title}
            icon={<BiSave size="25px" />}
          >
            Edit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TodoModal;
