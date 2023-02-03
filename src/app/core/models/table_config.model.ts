import { DataTable } from "./dataTable.model";

export interface tableConfig{
    search: boolean,
    pagination: boolean,
    data: any[],
    dataTable: DataTable[]
}
