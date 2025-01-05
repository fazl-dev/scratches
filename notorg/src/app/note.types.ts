export interface Note {
    title: string;
    content: string;
    tags?: Array<string>;
    _id: string;
    createdAt?: string;
    modifiedAt?: string;
}

export type NoteAction = 'ADD' | 'EDIT' | 'DELETE';