function formattedNumber(num: number, separator?: string): string {
  return num.toLocaleString().replace(/,/g, separator ?? ' ');
}

export default formattedNumber;
