import { useTheme as useNextTheme } from "next-themes";
import { MdWbSunny, MdBedtime } from "react-icons/md";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import {
  Container,
  Row,
  Switch,
  useTheme,
  Spacer,
  Grid,
  Text,
  Link,
  Button,
  Loading,
} from "@nextui-org/react";

const Header: React.FC = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const router = useRouter();

  const { data: session, status } = useSession();

  let menu;

  if (!session) {
    menu = (
      <Button
        auto
        rounded
        shadow
        color="primary"
        onClick={() => router.push("/api/auth/signin")}
      >
        Login
      </Button>
    );
  }

  if (session) {
    menu = (
      <Button
        borderWeight="bold"
        auto
        rounded
        shadow
        color="primary"
        onClick={() => signOut()}
      >
        Logout ({session?.user?.email})
      </Button>
    );
  }

  if (status === "loading") {
    menu = (
      <Button auto rounded shadow color="primary">
        <Loading color="white" size="sm" />
      </Button>
    );
  }

  return (
    <>
      <Spacer />
      <Container xl>
        <Row justify="center">
          <Grid.Container gap={2} justify="center">
            <Grid xs={6} justify="flex-start">
              <Text h3>{process.env.name}</Text>
            </Grid>
            <Grid xs={3} justify="flex-end"></Grid>
            <Grid xs={3} justify="flex-end">
              {menu}
              <Spacer x={1} />
              <Switch
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                size="xl"
                checked={isDark}
                iconOn={<MdWbSunny />}
                iconOff={<MdBedtime />}
              />
            </Grid>
          </Grid.Container>
        </Row>
      </Container>
    </>
  );
};

export default Header;
