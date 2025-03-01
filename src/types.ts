export type Todo = {
    description: string;
    duedate: string;
    priority: any;
};

export type TableProps = {
    todos: Todo[];
    handleDelete: (row: number) => void;
};