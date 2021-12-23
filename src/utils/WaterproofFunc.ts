export default class WaterproofFunc {

    //表格数据是否为空（部分空）
    static isTableEmpty (tableData: string | any[]){
        for(let k=0;k<tableData.length;k++){
            let data=tableData[k];
            for(let i = 0; i < data.length; i++){
                if(!data[i])return true
            }
        }
return false
    }

    //表格某一行是否为空
    static isRowEmpty(rowData){
        for(let i = 0; i < rowData.length; i++){
            if(!rowData[i])return true
        }
        return false
    }

    static isAmountEmpty (amountData: object|any){
if(Object.getOwnPropertyNames(amountData).length<2)return true
        for(let name in amountData){
            if(!amountData[name])return true
        }
        return false
    }

}
