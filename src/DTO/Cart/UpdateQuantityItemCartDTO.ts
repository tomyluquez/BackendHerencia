export interface UpdateQuantityItemCartDTO {
    Quantity: number;
    ItemId: number;
    Action: ActionUpdateItemCartDTO;
}

export type ActionUpdateItemCartDTO = "add" | "substract";
