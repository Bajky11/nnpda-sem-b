import {createGenericSlice} from "@/utils/redux/functions/createGenericSlice";

const DEVICES_TABLE_NAME = 'device'

const DEVICES_SLICE_NAME = 'devicesSlice'

export const devicesSlice = createGenericSlice(DEVICES_SLICE_NAME, DEVICES_TABLE_NAME);
export const addDevice = devicesSlice.actions.add;
