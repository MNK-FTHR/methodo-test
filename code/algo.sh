#!/bin/bash
# "Date"        "Niveau"    "Allonge"   "Assis"     "SessionID"                             "formattedDate"
# "1618937885"  "2"         "True"      "True"      "ed73e2a7-8f8a-493c-9388-c7cc4714b0ad"  "20/04/2021"

fileToRead="Enregistrement.csv"
fileToWrite="./code/EnregistrementUpdated.csv"
if test -f $fileToWrite; then
  rm -rf $fileToWrite
fi
set -o noclobber
echo "\"Date\",\"Niveau\",\"Allonge\",\"Assis\",\"SessionID\",\"formattedDate\",\"serie\",\"life\"" > $fileToWrite
if [ -f "$fileToWrite" ]; then 
  lineCounter=0
  while IFS= read -r line
  do
    if ((lineCounter>0)); then
      echo "$line,\"ho\"">> $fileToWrite
    fi
    lineCounter=$(expr $lineCounter + 1)
  done < "$fileToRead"
fi