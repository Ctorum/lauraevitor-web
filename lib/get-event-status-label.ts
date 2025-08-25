export function getEventStatusLabel(status: string): string {
    switch (status) {
        case "pending":
            return "Pendente";
        case "confirmed":
            return "Confirmado";
        case "declined":
            return "Recusado";
        default:
            return "Unknown";
    }
}
