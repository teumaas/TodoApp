import React from "react";
import { Text } from "@nextui-org/react";
import { ITodoItem } from "../../../interfaces/ITodoItem";

type Props = {
  data: ITodoItem;
};

const TodoCardItem = ({ data }: Props) => (
  <>
    <Text h3 weight="bold" transform="uppercase" color="#ffffffAA">
      {data.title}
    </Text>
    <Text h5 color="white">
      {data.description}
    </Text>
  </>
);

export default TodoCardItem;
