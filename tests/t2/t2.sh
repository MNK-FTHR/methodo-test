#!/bin/bash

source ./tests/testResult.sh
title="Test 2: Test d'incrémentation de séries"
testFile="./tests/t2/t2.csv"
echo "Test 1: Vérifier que l'incrémentation de séries fonctionne bien avec tout les cas de figures possible pour l'augmenter"
echo "Dans le fichier d'input de test, un utilisateur incrémente sa série de toutes les façons possible sur 4 jours, sa série finale doit être de 4"
echo "Le test est considéré comme OK si le script renvoit exitCode 0 et que sa série finale est bien 4"
echo "Lancement de $title avec en entrée $testFile"

runScript "$testFile"
lastValueOfLastCol=$(tail -n 1 "output.csv" | awk -F',' '{print $NF}' | tr -d '[:space:]' | tr -d '\r')

echo "La dernière valeur de séries en output est: $lastValueOfLastCol"
output=$(runScript "$testFile")
exit_code=$?
if [[ $exitCode -eq 0 && $lastValueOfLastCol == \"4\" ]]; then
    testPassed "$title"
fi
if [ $exitCode -eq 1 ]; then
    testFailed "$title"
fi