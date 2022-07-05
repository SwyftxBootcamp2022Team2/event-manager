import json
from flask import request_finished
from config import SLACK_WEBHOOK

def send_slack_message(payload):
    return request_finished.post(SLACK_WEBHOOK, json.dumps(payload))