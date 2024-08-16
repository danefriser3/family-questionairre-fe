import { Dispatch, SetStateAction } from "react";

export interface Dataset {
    dataset: Family[] | null;
    load: () => void;
    exported: Family[];
}

export interface Family {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    gender: string;
    favoriteAnimals: string[] | string;
    exported: boolean;
}

export interface SnackBarProps {
    open: boolean;
    text: string;
    status?: Status;
}

export interface DialogProps {
    params: any;
    load: () => void;
}

export interface DeleteDialogProps {
    children: any;
    open: boolean;
    handleClose: () => void;
    handleDeleteAll: () => void;
}

export interface QuestionairreDialogProps {
    load: () => void;
}

export type Status = "success" | "warning" | "error";