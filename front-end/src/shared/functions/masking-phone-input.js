export default function maskingPhoneInput(phoneInput, setPhone) {
  const value = phoneInput.current.value;
  const cleanedValue = value.replace(/[^\d]/g, ''); // Remove non-digit characters
  let formattedValue = '';

  if (cleanedValue.length >= 12) {
    formattedValue = `+${cleanedValue.slice(0, 3)} (${cleanedValue.slice(3, 6)}) ${cleanedValue.slice(6, 11)}-${cleanedValue.slice(11, 15)}`;
  }
  else if (cleanedValue.length <= 11 && cleanedValue.length > 6) {
    formattedValue = `+${cleanedValue.slice(0, 3)} (${cleanedValue.slice(3, 6)}) ${cleanedValue.slice(6, 11)}`;
  }
  else if (cleanedValue.length <= 6 && cleanedValue.length > 3) {
    formattedValue = `+${cleanedValue.slice(0, 3)} (${cleanedValue.slice(3, 6)}`;
  }
  else if (cleanedValue.length <= 3 && cleanedValue.length >= 1) {
    formattedValue = `+${cleanedValue.slice(0, 3)}`;
  }
  else {
    formattedValue = cleanedValue;
  }

  phoneInput.current.value = formattedValue;
  setPhone(formattedValue);
}