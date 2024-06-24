import md5 from 'md5';

const publicKey = import.meta.env.VITE_API_PUBLICKEY;
const privateKey = import.meta.env.VITE_API_PRIVATEKEY;

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

export const FetchHeroes = `https://gateway.marvel.com:443/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}`;
