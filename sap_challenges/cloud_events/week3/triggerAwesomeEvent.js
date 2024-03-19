const { CloudEvent, HTTP } = require("cloudevents");
require('dotenv').config();

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
const solace_topic = `dev-challenge/week-3/${sapcommunityid}/ce`

const { headers, body } = HTTP.structured(soEvent);

const postURL = `${solace_protocol}://${process.env.SOLACE_HOST}:${process.env.SOLACE_PORT}/TOPIC/${solace_topic}`

// Basic Authentication
const basicAuth = 'Basic ' + Buffer.from(process.env.SOLACE_USER + ':' + process.env.SOLACE_PWD).toString('base64');

headers["Authorization"] = basicAuth;

console.log("### March Developer Challenge - CloudEvents: Week 3 ###\n");
console.log("- HTTP Request Event Headers - \n")
for (const key in headers) {
    console.log(`Key: "${key}", Value: "${headers[key]}"`);
  }

console.log("\n - HTTP Request Event Body - \n");
console.log(JSON.stringify(JSON.parse(body), null, 1) + "\n");
console.log("\n - HTTP Response - ")

// Sending POST request to Solace
fetch(postURL, {
    method: 'POST',
    headers: headers,
    body: body
})
.then(response => {
    // Check if the response is OK
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // Return a response with HTTP status and a message
    return {
        status: response.status,
        message: 'CloudEvent successfully sent to Solace.'
    };
})
.then(responseObj => {
    // Print the response
    console.log('Response:', responseObj);
})
.catch(error => {
    // Print error message
    console.error('There was a problem with the fetch operation:', error);
});