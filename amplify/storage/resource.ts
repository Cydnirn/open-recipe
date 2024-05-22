import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: "questData",
    access: (allow) => ({
        "profile-pictures/{entity_id}/*": [
            allow.guest.to(["read"]),
            allow.entity("identity").to(["read", "write", "delete"]),
        ],
        "order-pictures/{order_id}/*": [
            allow.guest.to(["read"]),
            allow.entity("identity").to(["read", "write", "delete"]),
        ],
    }),
});
