import noFirstSpace from './noFirstSpace';

function ucFirst(str: string): string {
  const firstCharToUpperCase = noFirstSpace(str)[0].toUpperCase() + noFirstSpace(str).slice(1);

  return firstCharToUpperCase;
}

export default ucFirst;
