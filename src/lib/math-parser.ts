interface Token {
  type: "num" | "op";
  value: number | string;
}

export function safeEvaluate(expr: string): number {
  const tokens: Token[] = [];
  let i = 0;

  while (i < expr.length) {
    if (expr[i] >= "0" && expr[i] <= "9") {
      let num = "";
      while (i < expr.length && expr[i] >= "0" && expr[i] <= "9") num += expr[i++];
      tokens.push({ type: "num", value: Number(num) });
    } else if ("+-*/()".includes(expr[i])) {
      tokens.push({ type: "op", value: expr[i++] });
    } else {
      throw new Error("Invalid character");
    }
  }

  let pos = 0;
  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  const parseExpr = (): number => {
    let left = parseTerm();
    while (peek() && (peek().value === "+" || peek().value === "-")) {
      const op = consume().value;
      const right = parseTerm();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  };

  const parseTerm = (): number => {
    let left = parseFactor();
    while (peek() && (peek().value === "*" || peek().value === "/")) {
      const op = consume().value;
      const right = parseFactor();
      left = op === "*" ? left * right : left / right;
    }
    return left;
  };

  const parseFactor = (): number => {
    if (peek() && peek().value === "(") {
      consume();
      const result = parseExpr();
      if (!peek() || peek().value !== ")") throw new Error("Mismatched parentheses");
      consume();
      if (peek() && peek().value === "(") return result * parseFactor();
      return result;
    }
    if (peek() && peek().type === "num") {
      const val = consume().value as number;
      if (peek() && peek().value === "(") return val * parseFactor();
      return val;
    }
    throw new Error("Unexpected token");
  };

  const result = parseExpr();
  if (pos < tokens.length) throw new Error("Unexpected characters after expression");
  return result;
}

export function countNumbers(nums: string[]): Record<string, number> {
  return nums.reduce((acc, n) => {
    const key = String(n);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}
