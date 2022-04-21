// -----------------------------------------------------------Trie (Prefix Tree)
function TrieNode() {
    // table
    this.children = {};
    this.endOfWord = false;
}

function Trie() {
    this.root = new TrieNode();
}

Trie.prototype.insert = function (word) {
    var current = this.root;
    for (var i = 0; i < word.length; i++) {
        var ch = word.charAt(i);
        var node = current.children[ch];
        if (node == null) {
            node = new TrieNode();
            current.children[ch] = node;
        }
        current = node;
    }
    //mark the current nodes endOfWord as true
    current.endOfWord = true;
};

Trie.prototype.search = function (word) {
    var current = this.root;
    for (var i = 0; i < word.length; i++) {
        var ch = word.charAt(i);
        var node = current.children[ch];
        if (node == null) {
            // node doesn't exist
            return false;
        }
        current = node;
    }
    return current.endOfWord;
};

var trie = new Trie();
trie.insert("sammie");
trie.insert("simran");
trie.search("simran");
// true
trie.search("fake");
// false
trie.search("sam");
// false

Trie.prototype.delete = function (word) {
    this.deleteRecursively(this.root, word, 0);
};

Trie.prototype.deleteRecursively = function (current, word, index) {
    if (index == word.length) {
        //when end of word is reached only delete if currrent.endOfWord is true.
        if (!current.endOfWord) {
            return false;
        }
        current.endOfWord = false;
        //if current has no other mapping then return true
        return Object.keys(current.children).length == 0;
    }
    var ch = word.charAt(index),
        node = current.children[ch];
    if (node == null) {
        return false;
    }
    var shouldDeleteCurrentNode = this.deleteRecursively(node, word, index + 1);
    // if true is returned then
    // delete the mapping of character and trienode reference from map.
    if (shouldDeleteCurrentNode) {
        delete current.children[ch];
        //return true if no mappings are left in the map.
        return Object.keys(current.children).length == 0;
    }
    return false;
};

var trie1 = new Trie();
trie1.insert("sammie");
trie1.insert("simran");
trie1.search("simran");
// true
trie1.delete("sammie");
trie1.delete("simran");
trie1.search("sammie");
// false
trie1.search("simran");
// false

// ----------------------------------------------------Boyer–Moore String Search
function buildBadMatchTable(str) {
    var tableObj = {},
        strLength = str.length;
    for (var i = 0; i < strLength - 1; i++) {
        tableObj[str[i]] = strLength - 1 - i;
    }
    if (tableObj[str[strLength - 1]] == undefined) {
        tableObj[str[strLength - 1]] = strLength;
    }
    return tableObj;
}

buildBadMatchTable("data");
// {d: 3, a: 2, t: 1}
buildBadMatchTable("struct");
// {s: 5, t: 4, r: 3, u: 2, c: 1}
buildBadMatchTable("roi");
// {r: 2, o: 1, i: 3}
buildBadMatchTable("jam");
// {j: 2, a: 1, m: 3}

function boyerMoore(str, pattern) {
    var badMatchTable = buildBadMatchTable(pattern),
        offset = 0,
        patternLastIndex = pattern.length - 1,
        scanIndex = patternLastIndex,
        maxOffset = str.length - pattern.length;
    // if the offset is bigger than maxOffset, cannot be found
    while (offset <= maxOffset) {
        scanIndex = 0;
        while (pattern[scanIndex] == str[scanIndex + offset]) {
            if (scanIndex == patternLastIndex) {
                // found at this index
                return offset;
            }
            scanIndex++;
        }
        var badMatchString = str[offset + patternLastIndex];
        if (badMatchTable[badMatchString]) {
            // increase the offset if it exists
            offset += badMatchTable[badMatchString];
        } else {
            offset += 1;
        }
    }
    return -1;
}

boyerMoore("jellyjam", "jelly");
// 5. indicates that the pattern starts at index 5
boyerMoore("jellyjam", "jelly");
// 0. indicates that the pattern starts at index 0
boyerMoore("jellyjam", "sam");
// -1. indicates that the pattern does not exist

// ---------------------------------------------Knuth–Morris–Pratt String Search
function longestPrefix(str) {
    // prefix array is created
    var prefix = new Array(str.length);
    var maxPrefix = 0;
    // start the prefix at 0
    prefix[0] = 0;
    for (var i = 1; i < str.length; i++) {
        // decrement the prefix value as long as there are mismatches
        while (str.charAt(i) !== str.charAt(maxPrefix) && maxPrefix > 0) {
            maxPrefix = prefix[maxPrefix - 1];
        }
        // strings match, can update it
        if (str.charAt(maxPrefix) === str.charAt(i)) {
            maxPrefix++;
        }
        // set the prefix
        prefix[i] = maxPrefix;
    }
    return prefix;
}

console.log(longestPrefix("ababaca"));
// [0, 0, 1, 2, 3, 0, 1]

function KMP(str, pattern) {
    // build the prefix table
    var prefixTable = longestPrefix(pattern),
        patternIndex = 0,
        strIndex = 0;
    while (strIndex < str.length) {
        if (str.charAt(strIndex) != pattern.charAt(patternIndex)) {
            // Case 1: the characters are different
            if (patternIndex != 0) {
                // use the prefix table if possible
                patternIndex = prefixTable[patternIndex - 1];
            } else {
                // increment the str index to next character
                strIndex++;
            }
        } else if (str.charAt(strIndex) == pattern.charAt(patternIndex)) {
            // Case 2: the characters are same
            strIndex++;
            patternIndex++;
        }
        // found the pattern
        if (patternIndex == pattern.length) {
            return true;
        }
    }
    return false;
}

KMP("ababacaababacaababacaababaca", "ababaca");
// true
KMP("sammiebae", "bae");
// true
KMP("sammiebae", "sammie");
// true
KMP("sammiebae", "sammiebaee");
// false

// --------------------------------------------------------The Rabin Fingerprint
function RabinKarpSearch() {
    this.prime = 101;
}

RabinKarpSearch.prototype.rabinkarpFingerprintHash = function (str, endLength) {
    if (endLength == null) endLength = str.length;
    var hashInt = 0;
    for (var i = 0; i < endLength; i++) {
        hashInt += str.charCodeAt(i) * Math.pow(this.prime, i);
    }
    return hashInt;
};

var rks = new RabinKarpSearch();
rks.rabinkarpFingerprintHash("sammie");
// 1072559917336
rks.rabinkarpFingerprintHash("zammie");
// 1072559917343
rks.rabinkarpFingerprintHash("sa");
// 9912
rks.rabinkarpFingerprintHash("am");
// 11106

RabinKarpSearch.prototype.recalculateHash = function (
    str,
    oldIndex,
    newIndex,
    oldHash,
    patternLength
) {
    if (patternLength == null) patternLength = str.length;
    var newHash = oldHash - str.charCodeAt(oldIndex);
    newHash = Math.floor(newHash / this.prime);
    newHash +=
        str.charCodeAt(newIndex) * Math.pow(this.prime, patternLength - 1);
    return newHash;
};

var oldHash = rks.rabinkarpFingerprintHash("sa");
// 9912
rks.recalculateHash("same", 0, 2, oldHash, "sa".length);
// 11106

RabinKarpSearch.prototype.strEquals = function (
    str1,
    startIndex1,
    endIndex1,
    str2,
    startIndex2,
    endIndex2
) {
    if (endIndex1 - startIndex1 != endIndex2 - startIndex2) {
        return false;
    }
    while (startIndex1 <= endIndex1 && startIndex2 <= endIndex2) {
        if (str1[startIndex1] != str2[startIndex2]) {
            return false;
        }
        startIndex1++;
        startIndex2++;
    }
    return true;
};

RabinKarpSearch.prototype.rabinkarpSearch = function (str, pattern) {
    var T = str.length,
        W = pattern.length,
        patternHash = this.rabinkarpFingerprintHash(pattern, W),
        textHash = this.rabinkarpFingerprintHash(str, W);
    for (var i = 1; i <= T - W + 1; i++) {
        if (
            patternHash == textHash &&
            this.strEquals(str, i - 1, i + W - 2, pattern, 0, W - 1)
        ) {
            return i - 1;
        }
        if (i < T - W + 1) {
            textHash = this.recalculateHash(str, i - 1, i + W - 1, textHash, W);
        }
    }
    return -1;
};

var rks = new RabinKarpSearch();
rks.rabinkarpSearch("SammieBae", "as");
// -1
rks.rabinkarpSearch("SammieBae", "Bae");
// 6
rks.rabinkarpSearch("SammieBae", "Sam");
// 0
