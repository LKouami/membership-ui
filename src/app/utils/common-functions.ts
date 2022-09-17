import { MatDialogConfig } from "@angular/material/dialog";
import { Commune } from "../shared/models/commune";
import { Prefecture } from "../shared/models/prefecture";
import { Region } from "../shared/models/region";

export class CommonFunctions {

    static getEnumKeys(enumType: any): string[] {
        return Object.keys(enumType).filter(key => isNaN(Number(key)));
    }

    static getDialogConfig(action: string, title: string, isEdit: boolean, width: string, row?: any, prefectures?: Prefecture[], regions?: Region[], communes?: Commune[]): MatDialogConfig {
        return {
            width: width,
            data: {
                title: title,
                content: row,
                isEdit: isEdit,
                action: action,
                prefectures: prefectures,
                regions: regions,
                communes: communes

            }
        };
    }

    static refreshTable(table: any) {
        table.renderRows();
        table._updateChangeSubscription();
    }

    //return one element in array by Id
    static getElementById(array: any[], id: string): any {
        const element = array.find(x => x.Id == id);
        return element;
    }

    //open snackbar
    static openSnackBar(message: string, duration: number, snackBar: any) {
        snackBar.open(message,"D'accord", {
            duration: duration * 1000,
        });
    }
}