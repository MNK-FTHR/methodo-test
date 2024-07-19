#!/bin/bash

OS="`uname`"
if [ $# -eq 0 ]; then
    case "$OSTYPE" in
        darwin*)  ./code/methodo-test-macos 'Enregistrement.csv' ;; 
        linux*)   ./code/methodo-test-linux 'Enregistrement.csv' ;;
        msys*)    ./code/methodo-test-win 'Enregistrement.csv' ;;
        cygwin*)  ./code/methodo-test-win 'Enregistrement.csv' ;;
        *)        echo "unknown: $OSTYPE" ;;
    esac
    exit 1
fi
for var in "$@"
do
    cp -r "./tests/${var}.sh"
    sh "./tests/${var}.sh"
done