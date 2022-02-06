import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { Card, Text, Col, Grid, Button } from "@nextui-org/react";
import { BiTrash, BiEdit } from "react-icons/bi";

import TodoCardItem from "./Card.Item";
import { ITodoItem } from "../../../interfaces/ITodoItem";
import TodoModal from "../Modal/Modal";

type Props = {
  items: ITodoItem[];
};

async function deleteItem(id: number): Promise<void> {
  await fetch(`/api/item/delete/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const TodoCard = ({ items }: Props) => {
  return (
    <>
      {items.map((item) => (
        <Grid justify="flex-start" key={item.id} md={4}>
          <Card hoverable shadow cover>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <TodoCardItem data={item}></TodoCardItem>
              </Col>
            </Card.Header>
            <Card.Footer
              css={{
                position: "absolute",
                zIndex: 1,
                bottom: 0,
              }}
            >
              <Grid.Container gap={2} justify="center"></Grid.Container>
              <Grid>
                <Button.Group shadow auto rounded color="primary">
                  {/* <Button
                    onClick={() =>
                      updateItem(item.id, item.title, item.description)
                    }
                    icon={<BiEdit size={"20px"}></BiEdit>}
                  /> */}
                  <Button
                    onClick={() => deleteItem(item.id)}
                    icon={<BiTrash size={"20px"}></BiTrash>}
                  />
                </Button.Group>
              </Grid>
            </Card.Footer>
            <Card.Image
              src="/background.jpg"
              height={340}
              width="100%"
              alt="Card image background"
            />
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default TodoCard;
