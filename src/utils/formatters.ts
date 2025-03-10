
export function formatPhoneNumber(value: string) {
  const numbers = value.replace(/\D/g, '');
  let formatted = numbers;
  
  if (numbers.length >= 2) {
    formatted = `(${numbers.slice(0, 2)}`;
    if (numbers.length >= 3) {
      formatted += `) ${numbers.slice(2, 7)}`;
      if (numbers.length >= 7) {
        formatted += `-${numbers.slice(7, 11)}`;
      }
    }
  }
  
  return formatted;
}

export function cleanPhoneNumber(phone: string) {
  return phone.replace(/\D/g, '');
}
