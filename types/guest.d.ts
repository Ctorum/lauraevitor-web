import { GuestEventStatus } from "@/enums/guest-event-status";

type Guest = {
    name: string;
    email: string;
    phone: string;
    invitationCode: string;
    rsvpStatusFirst?: GuestEventStatus;
    rsvpStatusSecond?: GuestEventStatus;
};
