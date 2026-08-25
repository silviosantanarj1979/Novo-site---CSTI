const whatsappNumber="558005208454";

export function whatsappLink(section?:string){
  const origin="Olá! Vim pelo site da CSTI Brasil";
  const message=section?`${origin} e gostaria de falar sobre ${section}.`: `${origin} e gostaria de falar com um especialista.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
