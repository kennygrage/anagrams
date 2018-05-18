const request = require('request');
const http = require('http');
const fs = require('fs');

var inputWords;
var inputFile = "inputFile.txt";

//Get Word List from the Code Kata Website
function getWordList() {
    request({
        uri: 'http://codekata.com/data/wordlist.txt',
        method: "GET",
        json: true,
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, (err, res, body) => {
        if (err)
            console.log(err);
        else
            findAnagrams(body.split("\n"));
    }); //end request
} //end getWordList()


//Read Input File
function readInputFile() {
    fs.readFile(inputFile, (err, res) => {
        if(err)
            console.log(err);
        else
            inputWords = res.toString().split('\n');
    }); //end readFile
} //end readInputFile()


//Compare the input with the word list to find anagrams
function findAnagrams(wordList) {
    if (!wordList && !inputWords)
        console.log("Could not populate both input words and word list");
    else {
        for (var i=0; i<inputWords.length; i++) {
            if (!inputWords[i])
                continue;
            var outputLine = '';
            var sortedInputWord = inputWords[i].toLowerCase().split('').sort().join('');
            for (var j=0; j<wordList.length; j++) {
                //Don't include the same word
                if (inputWords[i].toLowerCase() === wordList[j].toLowerCase())
                    continue;

                if (sortedInputWord === wordList[j].toLowerCase().split('').sort().join('')) {
                    //Add the input word at the beginning
                    if (!outputLine)
                        outputLine = inputWords[i];

                    outputLine += " " + wordList[j];
                } //end if
            } //end inner for
            if (outputLine)
                console.log(outputLine);
        } //end outer for
    } //end else
} //end findAnagrams()

//Get the word list and the input file words asynchronously
//Since the word list takes longer to read, find anagrams after word list populates
getWordList();
readInputFile();
