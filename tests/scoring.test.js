import assert from "node:assert/strict";
import { QUESTIONS, TYPES } from "../src/data.js";
import { calculateResult } from "../src/scoring.js";

const allA = calculateResult([0, 0, 0, 0, 0, 0, 0, 0], QUESTIONS, TYPES);
assert.equal(allA.type.id, "baekyang");
assert.equal(allA.totals.baekyang, 10);

const allB = calculateResult([1, 1, 1, 1, 1, 1, 1, 1], QUESTIONS, TYPES);
assert.equal(allB.type.id, "akaraka");

const tieEarlierQuestion = calculateResult(
  [0, 1],
  [
    {
      options: [
        { scores: { baekyang: 2 } },
        { scores: { gongdae: 2 } }
      ]
    },
    {
      options: [
        { scores: { baekyang: 2 } },
        { scores: { gongdae: 2 } }
      ]
    }
  ],
  TYPES
);
assert.equal(tieEarlierQuestion.totals.baekyang, tieEarlierQuestion.totals.gongdae);
assert.equal(tieEarlierQuestion.type.id, "baekyang");

const tieArrayOrder = calculateResult([], QUESTIONS, TYPES);
assert.equal(tieArrayOrder.type.id, "baekyang");

console.log("scoring tests passed");
