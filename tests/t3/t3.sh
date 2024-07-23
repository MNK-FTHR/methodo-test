#!/bin/bash

source ./tests/testHelper.sh
title="Test 3: Test de non incrémentation le même jour"
description="Dans le fichier d'input de test, un utilisateur fait beaucoup d'exercice dans la même journée\nLe test est considéré comme OK si le script renvoit exitCode 0 et que sa série finale est bien 1"
testFile="./tests/t3/t3.csv"
echo "Test 3: Vérifier que l'incrémentation de séries s'arrête après la première incrémentation de la journée"
testDescription "$description"
echo -e "Lancement de $title avec en entrée $testFile \n"

runScript "$testFile"
lastValueOfLastCol=$(tail -n 1 "output.csv" | awk -F',' '{print $NF}' | tr -d '[:space:]' | tr -d '\r')

echo "La dernière valeur de séries en output est: $lastValueOfLastCol"
output=$(runScript "$testFile")
exit_code=$?
if [[ $exitCode -eq 0 && $lastValueOfLastCol == \"1\" ]]; then
    testPassed "$title"
fi
if [ $exitCode -eq 1 ]; then
    testFailed "$title"
fi