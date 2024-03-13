//Importing Cloud Event libraries.

const { CloudEvent, HTTP } = require("cloudevents");

const type = "com.awesome_company.sales_order.Updated.v1"
const source = "https://prod.illidian.awesome_company.com/sales_orders" 
const salesOrderID = "9024000013"
const company = "AWO01"
const year = 2024
const statusSO = "Shipped"

const subject = company + salesOrderID + year

const data = {
    "salesOrder": salesOrderID,
    "company": company,
    "year": year,
    "status": statusSO
}

//creating and calling event

const soEvent = new CloudEvent({type,source,subject,data})

const { headers, body } = HTTP.structured(soEvent);

//print the log

console.log("### March Developer Challenge - CloudEvents: Week 2 ###\n");
console.log("- HTTP Event Headers - \n")
for (const key in headers) {
    console.log(`Key: "${key}", Value: "${headers[key]}"`);
  }

console.log("\n - HTTP Event Body - \n");
console.log(JSON.stringify(JSON.parse(body), null, 1) + "\n");