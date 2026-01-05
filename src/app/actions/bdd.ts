"use server";

import {
    getBddConnectionStatus,
} from "@/core/services/bdd";


export const getBddConnectionStatusAction = async () => {
    return getBddConnectionStatus();
};
