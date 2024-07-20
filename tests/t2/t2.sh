#!/bin/bash

source ./tests/testResult.sh
title="Test 2: Test d'incrémentation de séries"
testFile="../../tests/t2/t2.csv"
echo "Test 1: Vérifier que l'incrémentation de séries fonctionne bien avec tout les cas de figures possible pour l'augmenter"
echo "Le test est considéré comme OK si le script renvoit exitCode 0 et que le checking des séries renvoit bien une série finale de l'utilisateur égale à"
echo "Lancement de $title avec en entrée $testFile"

runScript "$testFile"

output=$(runScript "$testFile")
exit_code=$?
if [ $exitCode -eq 0 ]; then
    testFailed "$title"
fi
if [ $exitCode -eq 1 ]; then
    testPassed "$title"
fi