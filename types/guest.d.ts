import { GuestEventStatus } from "@/enums/guest-event-status";

type Guest = {
    name: string;
    email: string;
    phone: string;
    invitation_code: string;
    rsvp_status_first: GuestEventStatus;
    rsvp_status_second: GuestEventStatus;
};
