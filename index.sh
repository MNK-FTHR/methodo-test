#!/bin/bash

# ----------------------------------
# Colors
# ----------------------------------
NOCOLOR='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
LIGHTGRAY='\033[0;37m'
DARKGRAY='\033[1;30m'
LIGHTRED='\033[1;31m'
LIGHTGREEN='\033[1;32m'
YELLOW='\033[1;33m'
LIGHTBLUE='\033[1;34m'
LIGHTPURPLE='\033[1;35m'
LIGHTCYAN='\033[1;36m'
WHITE='\033[1;37m'

defaultCSV='Enregistrement.csv'

showHelp() {
    echo "Usage: $0 [options] [csv_file]"
    echo
    echo "Options:"
    echo "  -t, --tests     Lance tout les tests puis lance le script avec le fichier $default_csv"
    echo "  -t1, --test1    Test 1: Test de fichier d'entrée"
    echo "  -t2, --test2    Test 2: Test d'incrémentation de séries"
    echo "  -t3, --test3    Test 3: Test de non incrémentation le même jour"
    echo "  -t4, --test4    Test 4: Test de gestion du système de vies"
    echo "  -t5, --test5    Test 5: Test de gestion du format de données"
    echo "  -h, --help      Affiche ce message"
    echo
    echo "Si aucunes option n'est fournie, le script lancera $exe_file avec $default_csv"
    echo "Si vous fournissez un fichier.csv en options, il sera lancé avec (sh index.sh MonFichier.csv)"
}

runScript() {
    OS="`uname`"
    case "$OSTYPE" in
        darwin*)  output=$(./code/methodo-test-macos "$1" 2>&1) ;; 
        linux*)   output=$(./code/methodo-test-linux "$1" 2>&1) ;;
        msys*)    output=$(./code/methodo-test-win "$1" 2>&1) ;;
        cygwin*)  output=$(./code/methodo-test-win "$1" 2>&1) ;;
        *)        echo "unknown: $OSTYPE" ;;
    esac
    exitCode=$?
    if [ $exitCode -eq 0 ]; then
        echo -e "${GREEN}exitCode: $exitCode${NOCOLOR}"
        echo -e "${GREEN}$output${NOCOLOR}"
    fi
    if [ $exitCode -eq 1 ]; then
        echo -e "${RED}$output${NOCOLOR}"
        echo -e "${RED}exitCode: $exitCode${NOCOLOR}"
    fi
}
export -f runScript

run_tests() {
    for dir in tests/*/; do
        if [[ -f "${dir}$(basename "$dir").sh" ]]; then
            # Exécuter le script de test
            bash "${dir}$(basename "$dir").sh"
        fi
    done
}

if [ $# -eq 0 ]; then
    runScript $defaultCSV
    exit 1
fi

while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--tests)
            run_tests
            runScript $defaultCSV
            shift
            ;;
        -t1|--test1)
            ./tests/t1/t1.sh
            shift
            ;;
        -t2|--test2)
            ./tests/t2/t2.sh
            shift
            ;;
        -t3|--test3)
            ./tests/t3/t3.sh
            shift
            ;;
        -t4|--test4)
            ./tests/t4/t4.sh
            shift
            ;;
        -t5|--test5)
            ./tests/t5/t5.sh
            shift
            ;;
        -h|--help)
            showHelp
            exit 0
            ;;
        *)
            if [[ -f $1 ]]; then
                runScript "$1"
            else
                echo "Erreur: Fichier $1 manquant"
                showHelp
                exit 1
            fi
            shift
            ;;
    esac
done