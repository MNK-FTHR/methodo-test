# "Date"        "Niveau"    "Allonge"   "Assis"     "SessionID"                             "formattedDate"
# "1618937885"  "2"         "True"      "True"      "ed73e2a7-8f8a-493c-9388-c7cc4714b0ad"  "20/04/2021"
import csv 
import os.path
from datetime import datetime

fileToWrite="./code/EnregistrementUpdated.csv"
fields = ["Date","Niveau","Allonge","Assis","SessionID","formattedDate","Serie"]
dataList = []
betterDataList = []

def serieIncrementer(item,oneTrueTrueIncrement,oneTrueFalseIncrement,oneFalseTrueIncrement,oneTrueFalseIncrementEnded,oneFalseTrueIncrementEnded):
    # 2 TRUE TRUE
    if ((item['Niveau'] == '2') and (item["Assis"]=="True") and (item['Allonge']=="True")):
        item['Serie'] = str(int(item['Serie'])+1)
    # 1 TRUE TRUE
    if ((item['Niveau'] == '1') and (item["Assis"]=="True") and (item['Allonge']=="True")):
        if oneTrueTrueIncrement == 1:
            item['Serie'] = str(int(item['Serie'])+1)
            oneTrueTrueIncrement = 0
        elif oneTrueTrueIncrement == 0:
            oneTrueTrueIncrement += 1
    # 1 TRUE FALSE
    if ((item['Niveau'] == '1') and (item["Assis"]=="True") and (item["Allonge"]=="False")):
        if oneTrueFalseIncrement == 1:
            oneTrueFalseIncrement = 0
            if oneFalseTrueIncrementEnded:
                oneFalseTrueIncrementEnded = False
                item['Serie'] = str(int(item['Serie'])+1)
        if oneTrueFalseIncrement == 0:
            oneTrueFalseIncrement +=1
    # 1 FALSE TRUE
    if ((item['Niveau'] == '1') and (item["Assis"]=="False") and (item["Allonge"]=="True")):
        if oneFalseTrueIncrement == 1:
            oneFalseTrueIncrement = 0
            if oneTrueFalseIncrementEnded:
                oneTrueFalseIncrementEnded = False
                item['Serie'] = str(int(item['Serie'])+1)
        if oneFalseTrueIncrement == 0:
            oneFalseTrueIncrement +=1
    return item['Serie']


def dataToVariable():
    with open('smallerEnregistrement.csv') as file:
        reader = csv.DictReader(file, fieldnames=["Date", "Niveau", "Allonge", "Assis", "SessionID", "formattedDate"], quotechar='"', quoting=csv.QUOTE_ALL)
        next(reader)
        for row in reader:
            dataList.append(dict(row))

def addSerieAndVieToData():
    sorted_by_sessionid = sorted(dataList, key=lambda x: x['SessionID'])
    betterDataList.extend(sorted_by_sessionid)
    session_ids = set()
    for d in betterDataList:
        session_ids.add(d['SessionID'])
    unique_session_ids = list(session_ids)
    for id in unique_session_ids:
        oneTrueTrueIncrement = 0
        oneTrueFalseIncrement = 0
        oneFalseTrueIncrement = 0
        oneTrueFalseIncrementEnded = False
        oneFalseTrueIncrementEnded = False
        sameDayBuffer = []
        life = 2
        incrementedToday = False
        lastSerieNumber = "0"
        for item in [d for d in betterDataList if d['SessionID'] == id]:
            actualLastSerieNumber = lastSerieNumber
            item['Serie'] = lastSerieNumber
            readableDate = datetime.fromtimestamp(int(item['Date'])).date()
            sameDayBuffer.append(readableDate)
            for i in range(1, len(sameDayBuffer)):
                if (sameDayBuffer[i-1] < sameDayBuffer[i]):
                    print(abs((sameDayBuffer[i] - sameDayBuffer[i-1]).days), f"{sameDayBuffer[i-1]} -> {sameDayBuffer[i]}")                        
                    sameDayBuffer.clear()
                    sameDayBuffer.append(readableDate)
                    incrementedToday = False
                    lastSerieNumber = serieIncrementer(item,oneTrueTrueIncrement,oneTrueFalseIncrement,oneFalseTrueIncrement,oneTrueFalseIncrementEnded,oneFalseTrueIncrementEnded)
                    if (lastSerieNumber > actualLastSerieNumber):
                        incrementedToday = True
                else:
                    if incrementedToday == False:
                        lastSerieNumber = serieIncrementer(item,oneTrueTrueIncrement,oneTrueFalseIncrement,oneFalseTrueIncrement,oneTrueFalseIncrementEnded,oneFalseTrueIncrementEnded)
                        if (lastSerieNumber > actualLastSerieNumber):
                            incrementedToday = True

if os.path.isfile('smallerEnregistrement.csv'):
    if os.path.exists(fileToWrite):
        os.remove(fileToWrite)
        print(f"{fileToWrite} supprimé.")
    dataToVariable()
    addSerieAndVieToData()
    with open(fileToWrite, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, quotechar='"', quoting=csv.QUOTE_ALL)
        writer.writerow(fields)
        for lines in betterDataList:
            writer.writerow(list(lines.values()))

else:
    print("Il n'y a pas de fichier Enregistrement.csv à lire pour moi :(")