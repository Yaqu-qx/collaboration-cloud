// 任务完成度
const calculateSf = (weights: number[]): number => {
  const sum = weights.reduce((acc, w) => acc + w, 0);
  return sum * 100;
};

// 资源平衡度
const calculateSb = (Nreal: number, Nideal: number): number => {
  const deviation = Math.abs(Nreal - Nideal) / Nideal;
  return (1 - deviation) * 100;
};

// 风险控制
const calculateSr = (Np: number, Ns: number, Not: number): number => {
  const ratio = (Np + Ns) / Not;
  return (1 - ratio) * 100;
};

// 综合计算
const calculateStotal = ({
  weights,
  Nreal,
  Nideal,
  Np,
  Ns,
  Not,
}: {
  weights: number[];
  Nreal: number;
  Nideal: number;
  Np: number;
  Ns: number;
  Not: number;
}): number => {
  const Sf = calculateSf(weights);
  const Sb = calculateSb(Nreal, Nideal);
  const Sr = calculateSr(Np, Ns, Not);

  return 0.6 * Sf + 0.3 * Sb + 0.1 * Sr;
};
export default calculateStotal;
