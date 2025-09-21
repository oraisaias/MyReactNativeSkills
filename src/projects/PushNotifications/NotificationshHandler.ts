
export async function onBackgroundMessage(remoteMessage: any) {
  console.log('Mensaje recibido en segundo plano!', remoteMessage);

  
  // Es importante devolver una promesa cuando terminas.
  return Promise.resolve();
}