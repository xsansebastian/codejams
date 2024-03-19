const fetch = require('node-fetch');
const { CloudEvent, HTTP } = require("cloudevents");

//cloud event data
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

const sapcommunityid = "xavisanse"
//creating event

const soEvent = new CloudEvent({type,source,subject,data,sapcommunityid})


//sending event to Solace
const solace_protocol = "https"
const solace_host = "mr-connection-plh11u5eu6a.messaging.solace.cloud"
const solace_port = "9443"
const solace_user = "solace-cloud-client"
const solace_pwd = "mcrtp5mps5q12lfqed5kfndbi2"
const solace_topic = `/dev-challenge/week-3/${sapcommunityid}/ce`

const { headers, body } = HTTP.structured(soEvent);

const postURL = `${solace_protocol}://${solace_host}:${solace_port}/TOPIC/${solace_topic}`

// Basic Authentication
const basicAuth = 'Basic ' + Buffer.from(solace_user + ':' + solace_pwd).toString('base64');

headers["Authorization"] = basicAuth;

//print the log


console.log("### March Developer Challenge - CloudEvents: Week 2 ###\n");
console.log("- HTTP Event Headers - \n")
for (const key in headers) {
    console.log(`Key: "${key}", Value: "${headers[key]}"`);
  }

console.log("\n - HTTP Event Body - \n");
console.log(JSON.stringify(JSON.parse(body), null, 1) + "\n");
