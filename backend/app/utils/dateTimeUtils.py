from datetime import datetime, tzinfo
from turtle import left
from dateutil import tz
from datetime import timezone

def convertUTCtoBrisbaneTime(UTCTime: datetime):
    from_zone = tz.gettz('UTC')
    to_zone = tz.gettz('Australia/Brisbane')

    # Tell the datetime object that it's in UTC time zone since 
    #datetime objects are 'naive' by default
    UTCTime = UTCTime.replace(tzinfo=from_zone)
    
    return UTCTime.astimezone(to_zone)
