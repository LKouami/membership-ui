import { MatDialogConfig } from "@angular/material/dialog";

export class CommonFunctions {
    
    static getEnumKeys(enumType: any): string[] {
        return Object.keys(enumType).filter(key => isNaN(Number(key)));
    }

    static getDialogConfig(action: string, title: string, isEdit: boolean, width: string,row?: any ): MatDialogConfig {
        console.log(action);
        console.log(isEdit);
        return {
            width: width,
            data: {
                title: title,
                content: row,
                isEdit: isEdit,
                action: action,
            }
        };
    }

    static refreshTable(table: any) {
        table.renderRows();
        table._updateChangeSubscription();
    }
}