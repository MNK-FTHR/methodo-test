#!/bin/bash

source ./tests/testResult.sh
title="Test 4: Test de gestion du système de vies"
testFile="./tests/t4/t4.csv"
echo "Test 4: Vérifier que l'incrémentation de séries s'arrête et reprend comme il faut avec le système de vies"
echo -e "Dans le fichier d'input de test: \n\t-un utilisateur monte sa série à deux (avoir une série de base, vies = 2) \n\t-s'arrête un jour (tester si une vie compense bien le jour manqué, vies = 1) \n\t-reprend pendant 5j (régénère la vie, vies = 2) \n\t-arrête 2j (tester si deux vie compense bien les jours manqués vies = 0) \n\t-reprend 10j (régénère les vies, vies = 2) \n\t-arrête 4j et reprend un jour (tester si la série est remise à 0, il complète son exercice et la série repasse à 1, vies = 0)"
echo -e "Teste que les vies: \n\t-ne dépassent pas 2 \n\t-soient bien incrémentées/décrémentées \n\t-influencent comme il faut la série "
echo -e "\nLe test est considéré comme OK si le script renvoit exitCode 0 et que sa série finale est bien 1"
echo "Lancement de $title avec en entrée $testFile"

runScript "$testFile"
lastValueOfLastCol=$(tail -n 1 "output.csv" | awk -F',' '{print $NF}' | tr -d '[:space:]' | tr -d '\r')
echo "La dernière valeur de séries en output est: $lastValueOfLastCol"
exit_code=$?
if [[ $exitCode -eq 0 && $lastValueOfLastCol == \"1\" ]]; then
    testPassed "$title"
fi
if [ $exitCode -eq 1 ]; then
    testFailed "$title"
fi