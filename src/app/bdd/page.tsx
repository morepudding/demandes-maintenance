import "server-only";

import { getBddConnectionStatusAction } from "../actions/bdd";

export default async function Models() {
    const bddStatus = await getBddConnectionStatusAction();

    return (
       <p>Connected to Database Name : <b>{bddStatus[0].bddName}</b> with user <b>{bddStatus[0].bddUser}</b></p>
    );
}