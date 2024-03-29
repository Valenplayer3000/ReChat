import { createSignal } from "solid-js";

import { createStore } from "solid-js/store";

import { createLocalSignal, createLocalStore } from "../util/utils";

import type {
  reply,
  server,
  settings as config,
  status,
  user,
} from "../types/rechat-types";

import type { BaseMessage } from "revolt-toolset";

export const [newMessage, setNewMessage] = createSignal<string>("");

export const [loggedIn, setLoggedIn] = createSignal<boolean>(false);

export const [usr, setUser] = createLocalStore<user>("user_info", {
  user_id: undefined,
  username: undefined,
  session_type: undefined,
});

export const [servers, setServers] = createStore<server>({
  isHome: true,
});

export const [messages, setMessages] = createStore<(BaseMessage | undefined)[]>(
  [],
);

export const [replies, setReplies] = createSignal<reply[]>([]);

export const [images, setImages] = createSignal<any[] | null | undefined>(
  undefined,
);

export const [imgUrls, setImgUrls] = createSignal<any[] | null | undefined>([]);

export const [pickerType, setPickerType] = createSignal<"react" | "emoji">(
  "emoji",
);

// Experimental Server side Nickname Switcher

export const [avatarImage, setAvatarImage] = createSignal<any>();

export const [nickname, setNickname] = createSignal<string>();

// Status Prefabs

export const [newMode, setNewMode] = createSignal<
  "Online" | "Idle" | "Focus" | "Busy" | "Invisible"
>();
export const [newStatus, setNewStatus] = createSignal<string | null>();

// ReChat Default Settings

export const [settings, setSettings] = createLocalStore<config>("settings", {
  show: false,
  showSuffix: false,
  suffix: false,
  newShowSuffix: undefined,
  zoomLevel: 5,
  session: undefined,
  status: "Online",
  session_type: undefined,
  showMedia: true,
  debug: false,
  emoji: "noto",
  experiments: {
    gifbox: false,
    picker: false,
    compact: false,
    nick: false,
    edited_format: "default",
    disappear: false,
    app_appearance: false,
  },

  appearance: {
    primary_color: "#2196f3",
    appbar_vairant: "outlined",
  },

  tour: {
    show: true
  }
});

// Fetch status list

export const [statuslist, setStatusList] = createLocalSignal<status[]>(
  "statusList",
  [],
);

// Experimental Emoji Picker

export const [showPicker, setShowPicker] = createSignal<boolean>(false);

export const [showGifBox, setShowGifBox] = createSignal<boolean>(false);

export const [anchorPicker, setAnchorPicker] = createSignal<null | HTMLElement>(
  null,
);

export const [showGifBoxPick, setShowGifBoxPick] = createSignal<boolean>(false);

export const [anchorGif, setAnchorGif] = createSignal<null | HTMLElement>(null);

// Shell Components

export const [showServerSidebar, setShowServerSidebar] = createSignal<boolean>(
  false,
);

export const [showChannelSidebar, setShowChannelSidebar] = createSignal<
  boolean
>(false);

export const [showSettings, setShowSettings] = createSignal<boolean>(false);

export const [showMenu, setShowMenu] = createSignal<boolean>(false);

export const [showMembers, setShowMembers] = createSignal<boolean>(false);

// Menu Anchor

export const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);

// Server info

export const [showInfo, setShowInfo] = createSignal<boolean>(false);

// Tour Components (Is just guiding you so you can't mess it around :trol:)

export const [showTour, setShowTour] = createSignal<boolean>(settings.tour.show);

// Custom Status

export const [showCustom, setShowCustom] = createSignal<boolean>(false);

export const [showCreation, setShowCreation] = createSignal<boolean>(false);