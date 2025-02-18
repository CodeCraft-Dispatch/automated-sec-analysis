import { Dsl } from "../../infrastructure/dsl-internal";
import { FileCaptureGivenDomain } from "./setup";
import { FileCaptureThenDomain } from "./expectations";
import { FileCaptureWhenDomain } from "./behavior";

export const fileCaptureDsl
    = new Dsl(FileCaptureGivenDomain, FileCaptureWhenDomain, FileCaptureThenDomain);