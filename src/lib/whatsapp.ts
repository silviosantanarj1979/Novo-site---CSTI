export function whatsappLink(section?:string){
  return section ? `/contato?origem=${encodeURIComponent(section)}` : "/contato";
}
