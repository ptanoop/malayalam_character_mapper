var fs = require('fs');
var MALAYALAM = (function(){
    var MALAYALAM_CHARS = {
        VOWELS : ['അ', 'ആ', 'ഇ', 'ഈ', 'ഉ', 'ഊ', 'ഋ', 'എ', 'ഏ', 'ഐ', 'ഒ', 'ഓ', 'ഔ', 'അം', 'അഃ'],
        CONSONANTS : ['ക', 'ഖ', 'ഗ', 'ഘ','ങ', 'ച', 'ഛ', 'ജ', 'ഝ', 'ഞ', 'ട', 'ഠ', 'ഡ', 'ഢ', 'ണ', 'ത', 'ഥ', 'ദ', 'ധ', 'ന', 'പ', 'ഫ', 'ബ', 'ഭ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ശ', 'ഷ', 'സ', 'ഹ', 'ള', 'ഴ', 'റ']
    };
    var LETTER_MAP_FILE = './app/LetterMaps/malayalam_letter_map.json'    
    var ALL_MALAYALAM_CHARS = [];
    for(var i = 0; i < MALAYALAM_CHARS.VOWELS.length; i++){
        ALL_MALAYALAM_CHARS.push(MALAYALAM_CHARS.VOWELS[i]);
    }
    for(var i = 0; i < MALAYALAM_CHARS.CONSONANTS.length; i++){
        ALL_MALAYALAM_CHARS.push(MALAYALAM_CHARS.CONSONANTS[i]);
    }

    var writeCharacterMap = function(){
        fs.writeFileSync(LETTER_MAP_FILE,JSON.stringify(mapJSON)); 
    }
    
    var readCharacterMap = function(){
        var letterMap = fs.readFileSync(LETTER_MAP_FILE);
        return JSON.parse(letterMap);
    }

    /** Check for file and create blank character map */
    var isFileWrite = false;    
    var mapJSON = [];
    if (fs.existsSync(LETTER_MAP_FILE)) {        
        mapJSON = readCharacterMap();
        for(var i = 0; i < ALL_MALAYALAM_CHARS.length; i++){
            if(mapJSON[i].letter != ALL_MALAYALAM_CHARS[i]){
                isFileWrite = true;
                break;
            }
        }              
    }
    else{
        isFileWrite = true;
    }
    if(isFileWrite){
        var newMapJSON = [];
        for(var i = 0; i < ALL_MALAYALAM_CHARS.length; i++){
            var charPoints = {};
            charPoints.letter = ALL_MALAYALAM_CHARS[i];
            charPoints.characterMap = (mapJSON[i]!= undefined && mapJSON[i].letter == ALL_MALAYALAM_CHARS[i])?mapJSON[i].characterMap:[];
            newMapJSON.push(charPoints);
        }
        writeCharacterMap();      
        mapJSON = newMapJSON;
    }
    /** Check for file and create blank character map */
    
    
   
    

    return {
        CHARACTERS : MALAYALAM_CHARS,        
        CHARACTERS_MAP : mapJSON,

        getCharacterMap :  function(letter){
            for(var i = 0; i < mapJSON.length; i++){
                if(mapJSON[i].letter == letter){
                    return mapJSON[i].characterMap;
                }
            }
            return [];
        },

        setCharacterMap : function(mapLetter){
            console.log('I am going to map : ',mapLetter.letter);
            console.log(mapJSON);
            for(var i = 0; i < mapJSON.length; i++){
                if(mapJSON[i].letter == mapLetter.letter){
                    mapJSON[i].characterMap = mapLetter.characterMap;
                    break;
                }
            }
            writeCharacterMap();
        }

    };
    
})();