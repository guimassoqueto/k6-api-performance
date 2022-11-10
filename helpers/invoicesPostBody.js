import uuid4 from "./uuid4.helper.js"
import randomNum from "./randomNum.helper.js"
import cnpjGen from "./cnpjGen.helper.js" 

export default function invoicesPostBody() {
    const id = uuid4()

    return {
        "id": id,
        "amount": 19.99,
        "orderId": id,
        "document": cnpjGen(),
        "items": [
          {
            "amount": 19.99,
            "chargeable": "collact.rent",
            "chargeableId": "string",
            "description": "string",
            "quantity": randomNum(1, 5)
          }
        ],
        "additionalData": {
          "name": "string",
          "email": "string",
          "chargeDate": "2022-11-10"
        }
    }
}
