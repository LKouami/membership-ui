import { MatDialogConfig } from "@angular/material/dialog";

export class CommonFunctions {
    
    static getEnumKeys(enumType: any): string[] {
        return Object.keys(enumType).filter(key => isNaN(Number(key)));
    }

    static getDialogConfig(row: any, title: string, isEdit: boolean, width: string ): MatDialogConfig {
        return {
            width: width,
            data: {
                title: title,
                content: row,
                isEdit: isEdit
            }
        };
    }
}