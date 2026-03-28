import { FieldValue, Timestamp } from "firebase-admin/firestore";

export type FirestoreDataTypes = 
    | string 
    | number 
    | boolean 
    | Date 
    | FieldValue 
    | Timestamp 
    | null