import { ActivationStatusEnum } from "../Enums/activation-status-enum"
import { NameAndId } from "../Interfaces/Name-and-id.interface"

export class StatusOptions {
    private Items: NameAndId[]

    constructor() {
        this.Items = [
            {
                Id: ActivationStatusEnum.Active,
                Name: 'Activo'
            },
            {
                Id: ActivationStatusEnum.Inactive,
                Name: 'Inactivo'
            }
        ]
    }

    get items() {
        return this.Items
    }
}