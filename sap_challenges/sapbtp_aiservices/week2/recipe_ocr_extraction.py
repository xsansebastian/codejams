# Import Document Information Extraction (DOX) API client
from sap_business_document_processing import DoxApiClient
# CONTENT_TYPE_UNKNOWN lets the library fetch the content type automatically based on the file's extension
from sap_business_document_processing.document_information_extraction_client.constants import CONTENT_TYPE_PNG
import json

# Insert your DOX service key json here and change true -> True
# Recover the service key from the service_key.json file
with open('../default_key.json') as f:
  service_key = json.load(f)


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