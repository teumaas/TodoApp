import React, { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Header from "../components/UI/Header";
import Todo from "../components/Todo/Card/Card";
import { ITodoItem } from "../interfaces/ITodoItem";
import { BiNotepad, BiPlusMedical, BiSave } from "react-icons/bi";
import { useSession, getSession } from "next-auth/react";
import Router from "next/router";
import prisma from "../lib/prisma";

import {
  Text,
  Grid,
  Button,
  Link,
  Modal,
  Input,
  Textarea,
  Loading,
} from "@nextui-org/react";

import Head from "next/head";
import TodoModal from "../components/Todo/Modal/Modal";
import TodoCard from "../components/Todo/Card/Card";

type Props = {
  items: ITodoItem[];
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { items: [] } };
  }

  const items = await prisma.item.findMany({
    where: {
      author: { email: session?.user?.email },
    },
  });
  return {
    props: { items },
  };
};

const Home: NextPage<Props> = ({ items }: Props) => {
  let addButton, placeholder;

  const { data: session } = useSession();
  const [state, setState] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [clickable, setClickable] = useState(true);

  const openHandler = () => {
    setClickable(true);
    setVisible(true);
  };
  const closeHandler = () => {
    setClickable(false);
    setTitle("");
    setDescription("");
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
      closeHandler();
      await Router.push("/");
    } catch (error) {}
  };

  if (!session) {
    placeholder = (
      <>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue500 -20%, $green500 100%",
          }}
          weight="bold"
        >
          Welcome, login to use {process.env.NEXT_PUBLIC_APP_NAME}
        </Text>
        <Text
          h1
          size={60}
          css={{
            textAlign: "center",
          }}
        >
          👋🏻
        </Text>
        <Text
          h4
          css={{
            textAlign: "center",
          }}
        >
          Built with Next.js, Prisma, NextAuth.js and NextUI.
        </Text>
        <Text
          css={{
            textAlign: "center",
          }}
        >
          By{" "}
          <Link target="_blank" href="https://github.com/teumaas">
            Tom Smits
          </Link>
        </Text>
      </>
    );
  }

  if (session) {
    addButton = (
      <>
        <Button
          shadow
          rounded
          color="primary"
          size="xl"
          icon={<BiPlusMedical></BiPlusMedical>}
          onClick={() => {
            openHandler();
          }}
        >
          Add Item
        </Button>

        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              <Text b size={18}>
                <Text>
                  <BiNotepad /> Add Todo
                </Text>
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
            <Button
              rounded
              type="submit"
              size="md"
              onClick={postItem}
              clickable={clickable}
              disabled={!description || !title}
              icon={<BiSave size="25px" />}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Grid.Container gap={4} justify="flex-start">
        <TodoCard items={items}></TodoCard>
      </Grid.Container>
      <Grid.Container gap={6} justify="center">
        <Grid justify="center" alignItems="center">
          {addButton}
        </Grid>
      </Grid.Container>
      <Grid.Container gap={4} alignItems="center" justify="center">
        <Grid>{placeholder}</Grid>
      </Grid.Container>
    </div>
  );
};

export default Home;
