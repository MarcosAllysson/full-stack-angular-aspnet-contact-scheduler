export function formatPhoneNumber(
    phoneNumber: string,
    isCellPhone: boolean = false
): string {

    if (!phoneNumber) return '';

    // const mask = isCellPhone ? '(99) 9 9999-9999' : '(99) 9999-9999';
    const formattedNumber = phoneNumber.replace(/\D+/g, '');

    if (isCellPhone) {
        return `(${formattedNumber.substring(0, 2)}) ${formattedNumber.substring(2, 3)} ${formattedNumber.substring(3, 7)}-${formattedNumber.substring(7, 11)}`;
    }

    return `(${formattedNumber.substring(0, 2)}) ${formattedNumber.substring(2, 6)}-${formattedNumber.substring(6, 10)}`;
}