import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const hiLoValues = {
  "2": 1, "3": 1, "4": 1, "5": 1, "6": 1,
  "7": 0, "8": 0, "9": 0,
  "10": -1, "J": -1, "Q": -1, "K": -1, "A": -1
};

export default function BlackjackAssistant() {
  const [seenCards, setSeenCards] = useState([]);
  const [decksRemaining, setDecksRemaining] = useState(4);
  const [cardInput, setCardInput] = useState("");

  const addCard = () => {
    if (cardInput in hiLoValues) {
      setSeenCards([...seenCards, cardInput]);
    }
    setCardInput("");
  };

  const runningCount = seenCards.reduce((sum, card) => sum + hiLoValues[card], 0);
  const trueCount = decksRemaining > 0 ? (runningCount / decksRemaining).toFixed(2) : 0;

  const recommendation = () => {
    const tc = parseFloat(trueCount);
    if (tc <= 0) return "Miză minimă. Dezavantaj mare.";
    if (tc === 1) return "Joacă normal. Neutral.";
    if (tc === 2) return "Crește ușor miza.";
    if (tc === 3) return "Miză mare. Ai avantaj.";
    return "MAX BET! Moment ideal pentru profit.";
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Blackjack Assistant – Hi-Lo Counter</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Introdu o carte (ex: 10, A, 5)"
              value={cardInput}
              onChange={(e) => setCardInput(e.target.value.toUpperCase())}
            />
            <Button onClick={addCard}>Adaugă</Button>
          </div>
          <div className="text-sm">Cărți văzute: {seenCards.join(", ")}</div>
          <div className="text-sm">
            <label>Pachete rămase: </label>
            <Input
              type="number"
              value={decksRemaining}
              onChange={(e) => setDecksRemaining(Number(e.target.value))}
              className="w-24 inline ml-2"
            />
          </div>
          <div className="text-lg font-semibold">Running Count: {runningCount}</div>
          <div className="text-lg font-semibold">True Count: {trueCount}</div>
          <div className="text-green-600 font-bold">{recommendation()}</div>
        </CardContent>
      </Card>
    </div>
  );
}