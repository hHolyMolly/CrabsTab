function noFirstSpace(str: string): string {
  const value: string = str.replace(/ +/g, ' ').trim();

  return value;
}

export default noFirstSpace;
