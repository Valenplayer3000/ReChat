import type { Accessor, Component, Setter } from "solid-js";
import { createSignal } from "solid-js";
import { Message } from "revolt.js";
import EmojiTab from "./Tabs/emoji";
import { Menu } from "@suid/material";

import * as ReChat from "../../../lib/ReChat";

interface props {
  setMessage?: Setter<string> | any;
  message?: Accessor<string> | any;
  messageToReact?: Message;
}

const [tab, setTab] = createSignal<number>(0);

export const Picker: Component<props> = (props) => {
  return (
    <Menu
      sx={{ height: 300 }}
      anchorEl={ReChat.anchorPicker()}
      open={ReChat.showPicker()}
      onClose={() => ReChat.setShowPicker(false)}
    >
      <EmojiTab
        setMessage={props.setMessage}
        message={props.message}
      />
    </Menu>
  );
};
