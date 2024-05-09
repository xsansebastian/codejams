# Import Document Information Extraction (DOX) API client
from sap_business_document_processing import DoxApiClient
# CONTENT_TYPE_UNKNOWN lets the library fetch the content type automatically based on the file's extension
from sap_business_document_processing.document_information_extraction_client.constants import CONTENT_TYPE_PNG
import json

# Insert your DOX service key json here and change true -> True
service_key = {
  "url": "https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com",
  "html5-apps-repo": {
    "app_host_id": "a64bcab8-c7f6-4fb1-a185-58842a6bd6a2"
  },
  "uaa": {
    "tenantmode": "shared",
    "sburl": "https://internal-xsuaa.authentication.us10.hana.ondemand.com",
    "subaccountid": "fd79938e-5105-4e01-97ec-f9452b8dd669",
    "credential-type": "binding-secret",
    "clientid": "sb-6e49a26c-e4fc-4013-b367-2f156a7b73e5!b263829|dox-xsuaa-std-trial!b10844",
    "xsappname": "6e49a26c-e4fc-4013-b367-2f156a7b73e5!b263829|dox-xsuaa-std-trial!b10844",
    "clientsecret": "cd1dd1bf-890d-4bf8-8266-20d2db38be3b$rB7LX5A6pA21DJTVeigjhPCcneaMXoGQrMrGbFsdgOI=",
    "serviceInstanceId": "6e49a26c-e4fc-4013-b367-2f156a7b73e5",
    "url": "https://7cdaab0ftrial.authentication.us10.hana.ondemand.com",
    "uaadomain": "authentication.us10.hana.ondemand.com",
    "verificationkey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmb8hCDkYv9sGjkteicJW\nYRQPPZvXMQxoIiPnwQU7XgZ1laU1P7AwwIZldd5b3L7UuBe6TEk1R4utnx7pOL5Z\nQaefVlwewbHigqgEdAy2WfAQqQkBQ1TFEec8cDnYObaX8wQGjvum1d6wscQbgFjA\n8Yxw1d0er4/77D4V8gON1vPZGf/xKKodeGUfp5mV76ZMN+6Ex98ANtGhu/R1gG/h\n67BFUJoqXHKPyj2IREeyBY2WOJ037z6bie96M5w3eo2UQfr/JSLBG9FWrPui3I64\nUCdYzTq5nFKPEDRjEegMoS/oXGiAWn1iaeoRoWtVyyNejpPva7EaYYf6PaVXU6Dr\nJQIDAQAB\n-----END PUBLIC KEY-----",
    "apiurl": "https://api.authentication.us10.hana.ondemand.com",
    "identityzone": "7cdaab0ftrial",
    "identityzoneid": "fd79938e-5105-4e01-97ec-f9452b8dd669",
    "tenantid": "fd79938e-5105-4e01-97ec-f9452b8dd669",
    "zoneid": "fd79938e-5105-4e01-97ec-f9452b8dd669"
  },
  "swagger": "/document-information-extraction/v1/",
  "saasregistryenabled": True,
  "endpoints": {
    "backend": {
      "url": "https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com",
      "timeout": 30000
    }
  },
  "sap.cloud.service": "com.sap.apps.documentinformationextraction",
  "tenantuiurl": "https://7cdaab0ftrial.us10-trial.doc.cloud.sap"
}

# Assign service key values to authenticate
url = service_key['url']
uaa_url = service_key['uaa']['url']
client_id = service_key['uaa']['clientid']
client_secret = service_key['uaa']['clientsecret']

# Instantiate object used to communicate with Document Information Extraction REST API
api_client = DoxApiClient(url, client_id, client_secret, uaa_url)

# Specify the fields that should be extracted
header_fields = [
         "recipe",
         "allergens",
         "serves"
    ]
line_item_fields = [
         "ingredient",
         "quantity"
    ]

# Extract information from recipe document  
document_result = api_client.extract_information_from_document(document_path='./tuna_quesadillas.png', 
                                                               client_id='default', 
                                                               document_type='custom', 
                                                               schema_id='9735b420-7cbc-401b-b1d4-b982821e0a6f',
                                                               mime_type=CONTENT_TYPE_PNG, 
                                                               header_fields=header_fields, 
                                                               line_item_fields=line_item_fields)

# Print the extracted data
print(json.dumps(document_result, indent=2))