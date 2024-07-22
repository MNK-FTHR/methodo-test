source ./tests/testResult.sh
title="Test 5: Test de gestion du format de données"
testFile="./tests/t5/t5.csv"
echo "Test 5: Vérifier que des données manquantes n'ai pas d'impact sur la donnée finale"
echo "Dans le fichier d'input de test: des niveaux manquent et des formattedDate manquent comme dans le fichier original."
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