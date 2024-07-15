# "Date"        "Niveau"    "Allonge"   "Assis"     "SessionID"                             "formattedDate"
# "1618937885"  "2"         "True"      "True"      "ed73e2a7-8f8a-493c-9388-c7cc4714b0ad"  "20/04/2021"
#1d = 86 400
import csv 
import os.path
from datetime import datetime
from typing import TypedDict

class I_SerieIncrementer(TypedDict):
    oneTrueTrueIncrement: int
    oneTrueFalseIncrement: int
    oneFalseTrueIncrement: int
    oneTrueFalseIncrementEnded: bool
    oneFalseTrueIncrementEnded: bool

class I_SessionIDDatas(I_SerieIncrementer):
    sameDayBuffer: list
    life: int
    incrementedToday: bool
    lastSerieNumber: str

fileToWrite="./code/EnregistrementUpdated.csv"
fields = ["Date","Niveau","Allonge","Assis","SessionID","formattedDate","Serie"]
dataList = []

def dataToVariable():
    with open('smallerEnregistrement.csv') as file:
        reader = csv.DictReader(file, fieldnames=["Date", "Niveau", "Allonge", "Assis", "SessionID", "formattedDate"], quotechar='"', quoting=csv.QUOTE_ALL)
        next(reader)
        for row in reader:
            dataList.append(dict(row))

def serieIncrementer(item):
        # 2 TRUE TRUE
    if ((item['Niveau'] == '2') and (item["Assis"]=="True") and (item['Allonge']=="True")):
        actualLastSerieNumber = str(int(item['Serie'])+1)
    # 1 TRUE TRUE
    if ((item['Niveau'] == '1') and (item["Assis"]=="True") and (item['Allonge']=="True")):
        if oneTrueTrueIncrement == 1:
            actualLastSerieNumber = str(int(item['Serie'])+1)
            oneTrueTrueIncrement = 0
        elif oneTrueTrueIncrement == 0:
            oneTrueTrueIncrement += 1
    # 1 TRUE FALSE
    if ((item['Niveau'] == '1') and (item["Assis"]=="True") and (item["Allonge"]=="False")):
        if oneTrueFalseIncrement == 1:
            oneTrueFalseIncrement = 0
            if oneFalseTrueIncrementEnded:
                oneFalseTrueIncrementEnded = False
                actualLastSerieNumber = str(int(item['Serie'])+1)
        if oneTrueFalseIncrement == 0:
            oneTrueFalseIncrement +=1
    # 1 FALSE TRUE
    if ((item['Niveau'] == '1') and (item["Assis"]=="False") and (item["Allonge"]=="True")):
        if oneFalseTrueIncrement == 1:
            oneFalseTrueIncrement = 0
            if oneTrueFalseIncrementEnded:
                oneTrueFalseIncrementEnded = False
                actualLastSerieNumber = str(int(item['Serie'])+1)
        if oneFalseTrueIncrement == 0:
            oneFalseTrueIncrement +=1

def updateSerie(sessionIDDatas, item):
    oneTrueTrueIncrement, oneTrueFalseIncrement, oneFalseTrueIncrement, oneTrueFalseIncrementEnded, oneFalseTrueIncrementEnded, sameDayBuffer, life, incrementedToday, lastSerieNumber = sessionIDDatas
     
    print(sameDayBuffer, life, incrementedToday, lastSerieNumber)
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
                print('incrementedToday')
                incrementedToday = True
        else:
            if incrementedToday == False:
                lastSerieNumber = serieIncrementer(item,oneTrueTrueIncrement,oneTrueFalseIncrement,oneFalseTrueIncrement,oneTrueFalseIncrementEnded,oneFalseTrueIncrementEnded)
                if (lastSerieNumber > actualLastSerieNumber):
                    incrementedToday = True

    return sessionIDDatas, actualLastSerieNumber


def serieUpdaterBySessionID(id):
    newDataListToReturn = []
    sessionIDDatas: I_SessionIDDatas = {
        'oneTrueTrueIncrement': 0,
        'oneTrueFalseIncrement': 0,
        'oneFalseTrueIncrement': 0,
        'oneTrueFalseIncrementEnded': False,
        'oneFalseTrueIncrementEnded': False,
        'sameDayBuffer': [],
        'life': 2,
        'incrementedToday': False,
        'lastSerieNumber': "0"
    }
    for item in [d for d in dataList if d['SessionID'] == id]:
        newData = item
        sessionIDDatas, newData["Serie"] = updateSerie(sessionIDDatas, item)
        newDataListToReturn.append(newData)
    return newDataListToReturn

def calculatingSerie():
    sortedBySessionID = sorted(dataList, key=lambda x: x['SessionID'])
    session_ids = set()
    for d in sortedBySessionID:
        session_ids.add(d['SessionID'])
    #ICI ON A UNE LISTE DE SESSIONID UNIQUES 
    unique_session_ids = list(session_ids)
    newDataListToReturn = []
    for id in unique_session_ids:
        newData = serieUpdaterBySessionID(id)
        newDataListToReturn.extend(newData)
    return sorted(newDataListToReturn, key=lambda x: x['Date'])

def mainLoop():
    if os.path.isfile('smallerEnregistrement.csv'):
        if os.path.exists(fileToWrite):
            os.remove(fileToWrite)
            print(f"{fileToWrite} supprimé.")
        dataToVariable()
        dataToWrite = calculatingSerie()
        with open(fileToWrite, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile, quotechar='"', quoting=csv.QUOTE_ALL)
            writer.writerow(fields)
            for lines in dataList:
                writer.writerow(list(lines.values()))
    else:
        print("Il n'y a pas de fichier Enregistrement.csv à lire pour moi :(")

mainLoop()