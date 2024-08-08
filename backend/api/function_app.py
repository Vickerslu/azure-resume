import logging
import os
import json
import azure.functions as func
from azure.identity import DefaultAzureCredential
from azure.cosmos import CosmosClient, exceptions

endpoint = os.environ['COSMOS_DB_ENDPOINT']
key = DefaultAzureCredential()
client = CosmosClient(endpoint, key)
database_name = 'AzureResume'
container_name = 'Counter'

app = func.FunctionApp()

@app.function_name(name="HttpTrigger")
@app.route(route="counter")
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    database = client.get_database_client(database_name)
    container = database.get_container_client(container_name)

    try:
        item = container.read_item(item='1', partition_key='1')
        item['count'] += 1
        container.replace_item(item=item, body=item)
    except exceptions.CosmosHttpResponseError as e:
        logging.error(f'Error: {e}')
        return func.HttpResponse(f'Error: {e}', status_code=500)

    return func.HttpResponse(
        json.dumps({"count": item['count']}),
        mimetype="application/json",
        status_code=200
    )
