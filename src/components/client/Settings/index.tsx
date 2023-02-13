import {
  Alert,
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Slide,
  Switch as SwitchMUI,
  Toolbar,
  Typography,
} from "@suid/material";
import { TransitionProps } from "@suid/material/transitions/transition";

import {
  ArrowBack,
  CheckBox,
  Close as CloseIcon,
  Face,
  GifBox,
  Image,
  Info,
  Person,
  Science,
  Tune,
} from "@suid/icons-material";

import { Component, createSignal, JSXElement, Match, Switch } from "solid-js";

import * as ReChat from "../../../lib/ReChat";
import { Index } from "unist-util-visit";
import { revolt } from "../../../lib/revolt";

const Transition = function Transition(
  props: TransitionProps & {
    children: JSXElement;
  },
) {
  return <Slide direction="up" {...props} />;
};

function updateStatus(
  mode?: "Online" | "Focus" | "Idle" | "Busy" | "Invisible" | null | undefined,
  status?: string,
) {
  if (mode && status) {
    revolt.api.patch("/users/@me", {
      status: {
        presence: mode,
        text: status,
      },
    });
  } else {
    revolt.api.patch("/users/@me", {
      status: {
        presence: ReChat.settings.status || revolt.user?.presence,
        text: ReChat.settings.statusText || revolt.user?.status,
      },
    });
  }
}

const [Tab, setTab] = createSignal<Index>(0);

const Settings: Component = () => {
  return (
      <Dialog
        fullScreen
        open={ReChat.showSettings()}
        onClose={() => ReChat.setShowSettings(false)}
        TransitionComponent={Transition}
      >
        <AppBar variant="outlined" position="static" sx={{ position: "relative" }}>
          <Toolbar>
            <Switch>
              <Match when={Tab() === 0}>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => ReChat.setShowSettings(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Match>
              <Match when={Tab() !== 0}>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setTab(0)}
                  aria-label="close"
                >
                  <ArrowBack />
                </IconButton>
              </Match>
            </Switch>
            <Typography
              sx={{
                ml: 2,
                flex: 1,
              }}
              variant="h6"
              component="div"
            >
              Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Match when={Tab() === 0}>
            <List>
              <ListItem>
                <ListItemButton onClick={() => setTab(1)}>
                  <ListItemIcon>
                    <Tune />
                  </ListItemIcon>
                  <ListItemText
                    primary="ReChat Settings"
                    secondary="Client Settings"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => setTab(2)}>
                  <ListItemIcon>
                    <Science/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Experiments"
                    secondary="Experimental Features"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => setTab(3)}>
                  <ListItemIcon>
                    <Info />
                  </ListItemIcon>
                  <ListItemText
                    primary="About ReChat"
                    secondary="Information about ReChat"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Match>
          <Match when={Tab() === 1}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Image />
                </ListItemIcon>
                <ListItemText
                  primary="Show Attachments"
                  secondary="Shows attachments like Images, Video and Audio.  Disabling Attachments might save bandwitdh, useful when mobile data"
                />
                <SwitchMUI
                  value={ReChat.settings.showMedia}
                  checked={ReChat.settings.showMedia}
                  onChange={() => {
                    ReChat.settings.showMedia
                      ? ReChat.setSettings("showMedia", false)
                      : ReChat.setSettings("showMedia", true);
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary="Status"
                  secondary="Change Status like Online, Focus, Busy, Idle and Offline"
                />
                <FormControl>
                  <Select
                    variant="standard"
                    id="rechat-status-select"
                    value={ReChat.settings.status}
                    onChange={(e) => {
                      ReChat.setSettings("status", e.target.value);
                      updateStatus(e.target.value);
                    }}
                  >
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Focus">Focus</MenuItem>
                    <MenuItem value="Busy">Busy</MenuItem>
                    <MenuItem value="Idle">Idle</MenuItem>
                    <MenuItem value="Offline">Offline</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Match>
          <Match when={Tab() === 2}>
            <Alert severity="warning">Some Experiments can cause ReChat more unstable (I think it will be """"""stable"""""")</Alert>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Face/>
                </ListItemIcon>
                <ListItemText
                  primary="Emoji Picker"
                  secondary="Enable emoji picker (Early Work in Progress)"
                />
                <SwitchMUI
                  value={ReChat.settings.experiments.picker}
                  checked={ReChat.settings.experiments.picker}
                  onChange={() => {
                    ReChat.settings.experiments.picker
                      ? ReChat.setSettings("experiments", "picker", false)
                      : ReChat.setSettings("experiments", "picker", true);
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GifBox />
                </ListItemIcon>
                <ListItemText
                  primary="GifBox"
                  secondary="Enable GifBox support (Requires Emoji Picker enabled)"
                />
                <SwitchMUI
                  value={ReChat.settings.experiments.gifbox}
                  checked={ReChat.settings.experiments.gifbox}
                  onChange={() => {
                    ReChat.settings.experiments.gifbox
                      ? ReChat.setSettings("experiments", "gifbox", false)
                      : ReChat.setSettings("experiments", "gifbox", true);
                  }}
                />
              </ListItem>
            </List>
          </Match>
          <Match when={Tab() === 3}>
            <Container sx={{marginTop: 1}}>
                <Card>
                    <CardHeader title="ReChat" subheader="Version 0.0.1" />
                    <CardContent>
                        <p>Made by Bloom#9014 (@Bloom in revolt)</p>

                        <p>This client was made using Solidjs and SUID (Material UI ported into Solidjs)</p>
                    </CardContent>
                </Card>
            </Container>
          </Match>
        </Switch>
      </Dialog>
  );
};

export { Settings };
