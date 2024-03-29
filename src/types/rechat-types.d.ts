import type { Server, Channel } from "revolt-toolset";

declare interface user {
    user_id: string | undefined;
    username: string | undefined;
    session_type: "email" | "token" | undefined;
}

declare interface loginValues {
    email?: string;
    password?: string;
    token?: string;
    mfa_token?: string; /* Unused? */
}

declare interface server {
    current_server?: Server;
    current_channel?: Channel;
    isHome: boolean | undefined;
}

declare interface status {
    id: number,
    mode:
    | "Online"
    | "Focus"
    | "Idle"
    | "Busy"
    | "Invisible"
    | null
    | undefined,
    text: string,
}

declare interface reply {
    id: string,
    mention: boolean
}

declare interface settings {
    show: boolean;
    status: "Online" | "Focus" | "Idle" | "Busy" | "Invisible" | null | undefined;
    statusText?: any;
    showSuffix: boolean;
    newShowSuffix: undefined | boolean;
    suffix: boolean;
    session?: any | undefined;
    session_type?: string | undefined;
    zoomLevel: number;
    showMedia: boolean;
    debug: boolean;
    emoji: "mutant" | "twemoji" | "fluent-3d" | "noto" | string;
    
    experiments: {
        picker: boolean,
        gifbox: boolean,
        compact: boolean,
        nick: boolean,
        edited_format: "ISO" | "UTC" | "default" | string,
        disappear: boolean,
        app_appearance: boolean,
    }

    appearance: {
        primary_color: string | undefined;
        appbar_vairant: "outlined" | "elevation" | undefined;
    }

    tour: {
        show: boolean
    }
}