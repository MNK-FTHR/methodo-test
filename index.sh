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

show_help() {
    echo "Usage: $0 [options] [csv_file]"
    echo
    echo "Options:"
    echo "  -t, --test1     Run test 1"
    echo "  -t2, --test2    Run test 2"
    echo "  -h, --help      Display this help message"
    echo
    echo "If no options are provided, the script will launch $exe_file with $default_csv or a provided csv_file."
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

if [ $# -eq 0 ]; then
    runScript $defaultCSV
    exit 1
fi

while [[ $# -gt 0 ]]; do
    case $1 in
        -t1|--test1)
            ./tests/t1/t1.sh
            shift
            ;;
        -t2|--test2)
            ./tests/t2/t2.sh
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            # Assume it's a CSV file
            if [[ -f $1 ]]; then
                run_exe "$1"
            else
                echo "Error: File $1 not found"
                show_help
                exit 1
            fi
            shift
            ;;
    esac
done