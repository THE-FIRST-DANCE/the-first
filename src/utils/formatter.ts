export function getFormattedElapsedTime(
  inputdate: Date | number,
  base?: Date | number
): string {
  const date = new Date(inputdate);
  const baseDate = base ? new Date(base) : new Date();
  const diffInSeconds = Math.floor(
    (baseDate.getTime() - date.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 3600) {
    return Math.floor(diffInSeconds / 60) + '분 전';
  } else if (diffInSeconds < 86400) {
    return Math.floor(diffInSeconds / 3600) + '시간 전';
  } else if (diffInSeconds < 604800) {
    return Math.floor(diffInSeconds / 86400) + '일 전';
  } else {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0') +
      ' ' +
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      ':' +
      date.getSeconds().toString().padStart(2, '0')
    );
  }
}

export const getColorFromUsername = (username: string) => {
  const firstLetter = username[0].toUpperCase();
  switch (firstLetter) {
    case 'A':
      return '#FF5733';
    case 'B':
      return '#FFBD33';
    case 'C':
      return '#FFD633';
    case 'D':
      return '#D6FF33';
    case 'E':
      return '#BDFF33';
    case 'F':
      return '#73FF33';
    case 'G':
      return '#33FF57';
    case 'H':
      return '#33FFBD';
    case 'I':
      return '#33FFD6';
    case 'J':
      return '#33D6FF';
    case 'K':
      return '#33BDFF';
    case 'L':
      return '#3373FF';
    case 'M':
      return '#5733FF';
    case 'N':
      return '#BD33FF';
    case 'O':
      return '#D633FF';
    case 'P':
      return '#FF33D6';
    case 'Q':
      return '#FF33BD';
    case 'R':
      return '#FF3373';
    case 'S':
      return '#FF3333';
    case 'T':
      return '#FF5733';
    case 'U':
      return '#FFBD33';
    case 'V':
      return '#FFD633';
    case 'W':
      return '#D6FF33';
    case 'X':
      return '#BDFF33';
    case 'Y':
      return '#73FF33';
    case 'Z':
      return '#33FF57';
    default:
      return '#f0f0f0';
  }
};

export const getNameFromEmail = (email: string) => {
  return email.split('@')[0];
};
