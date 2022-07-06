import json
import requests
from config import SLACK_WEBHOOK


def send_slack_message(payload):
    return requests.post(SLACK_WEBHOOK, json.dumps(payload))
