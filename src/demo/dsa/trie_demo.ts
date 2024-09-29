// npx ts-node -r tsconfig-paths/register src/demo/dsa/trie_demo.ts

import { Trie } from 'modules/dsa/trie';

// (root)
//  ├── a
//  │   └── p
//  │       └── p*
//  │           └── l
//  │               └── e*
//  ├── b
//  │   └── a
//  │       ├── n
//  │       │   └── d*
//  │       │       └── a
//  │       │           └── g
//  │       │               └── e*
//  │       └── t*
//  │           └── h*
//  └── c
//      └── a
//          └── t*
//
// How the Trie Works:
// - Each branch represents a character in the words inserted.
// - Nodes with * represent complete words.
// - Prefixes are naturally shared (e.g., "bat" and "bath" share the path b → a → t).

// === Initializing and Inserting Words into the Trie ===
function demoTrieInsertion(trie: Trie) {
    console.log("Inserting words into the Trie...");
    trie.add("apple")
        .add("app")
        .add("banana")
        .add("band")
        .add("bandage")
        .add("bat")
        .add("bath")
        .add("cat");

    console.log("Words inserted successfully.");
}

// === Searching for Existing Words ===
function demoTrieSearchExistingWords(trie: Trie) {
    console.log("\nSearching for words...");
    console.log("Searching for 'apple':", trie.find("apple"));  // Expected: true
    console.log("Searching for 'app':", trie.find("app"));  // Expected: true
    console.log("Searching for 'banana':", trie.find("banana"));  // Expected: true
    console.log("Searching for 'bat':", trie.find("bat"));  // Expected: true
    console.log("Searching for 'bath':", trie.find("bath"));  // Expected: true
    console.log("Searching for 'bandage':", trie.find("bandage"));  // Expected: true
}

// === Searching for Non-Existing Words ===
function demoTrieSearchNonExistingWords(trie: Trie) {
    console.log("\nSearching for non-existing words...");
    console.log("Searching for 'apples':", trie.find("apples"));  // Expected: false
    console.log("Searching for 'bats':", trie.find("bats"));  // Expected: false
    console.log("Searching for 'bandit':", trie.find("bandit"));  // Expected: false
    console.log("Searching for 'dog':", trie.find("dog"));  // Expected: false
}

// === Prefix Searching ===
function demoTriePrefixSearch(trie: Trie) {
    console.log("\nPrefix searching...");
    console.log("Searching for prefix 'app':", trie.find("app", true));  // Expected: true
    console.log("Searching for prefix 'ban':", trie.find("ban", true));  // Expected: true
    console.log("Searching for prefix 'bat':", trie.find("bat", true));  // Expected: true
    console.log("Searching for prefix 'ba':", trie.find("ba", true));  // Expected: true
    console.log("Searching for prefix 'cat':", trie.find("cat", true));  // Expected: true
    console.log("Searching for prefix 'ca':", trie.find("ca", true));  // Expected: true
    console.log("Searching for prefix 'c':", trie.find("c", true));  // Expected: true
}

// === Prefix Searching for Non-Existing Prefixes ===
function demoTrieNonExistingPrefixSearch(trie: Trie) {
    console.log("\nSearching for non-existing prefixes...");
    console.log("Searching for prefix 'dog':", trie.find("dog", true));  // Expected: false
    console.log("Searching for prefix 'd':", trie.find("d", true));  // Expected: false
    console.log("Searching for prefix 'applepie':", trie.find("applepie", true));  // Expected: false
}

// === Chaining Example ===
function demoTrieChaining(trie: Trie) {
    console.log("\nUsing chaining to add words...");
    trie.add("dog").add("door").add("dorm").add("dolphin");
    console.log("Chaining words added.");

    // Search the newly added words using chaining
    console.log("Searching for 'dog':", trie.find("dog"));  // Expected: true
    console.log("Searching for 'door':", trie.find("door"));  // Expected: true
    console.log("Searching for 'dorm':", trie.find("dorm"));  // Expected: true
    console.log("Searching for 'dolphin':", trie.find("dolphin"));  // Expected: true
}

// === Final Summary of Searches ===
function demoTrieSummarySearches(trie: Trie) {
    console.log("\nFinal word searches...");
    console.log("Trie contains 'band':", trie.find("band"));  // Expected: true
    console.log("Trie contains 'apple':", trie.find("apple"));  // Expected: true
    console.log("Trie contains 'cat':", trie.find("cat"));  // Expected: true
    console.log("Trie contains 'dorm':", trie.find("dorm"));  // Expected: true
    console.log("Trie contains 'dog':", trie.find("dog"));  // Expected: true
    console.log("Trie contains 'fish':", trie.find("fish"));  // Expected: false
}

// === Run all demos ===
function runAllTrieDemos() {
    const trie = new Trie();

    // Run all the individual demo sections
    demoTrieInsertion(trie);
    demoTrieSearchExistingWords(trie);
    demoTrieSearchNonExistingWords(trie);
    demoTriePrefixSearch(trie);
    demoTrieNonExistingPrefixSearch(trie);
    demoTrieChaining(trie);
    demoTrieSummarySearches(trie);
}

// Execute all demos
runAllTrieDemos();
