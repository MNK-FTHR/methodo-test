#!/bin/bash

source ./tests/testHelper.sh
title="Test 1: Test de fichier d'entrée"
description="Le test est considéré comme OK si le script renvoit exitCode 1 avec un message de refus du fichier"
testFile="./test.txt"
echo "Test 1: Vérifier que le ficher donné est bien un .csv"
testDescription "$description"
echo -e "Lancement de $title avec en entrée $testFile \n"
runScript "$testFile"
output=$(runScript "$testFile")
exit_code=$?
if [ $exitCode -eq 0 ]; then
    testFailed "$title"
fi
if [ $exitCode -eq 1 ]; then
    testPassed "$title"
fi