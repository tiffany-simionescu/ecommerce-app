import axios from 'axios';

export const getSubs = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API}/subs`);
};

export const getSub = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/sub/${slug}`);
};

export const removeSub = async (authtoken, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/sub/${slug}`, {
      headers: {
        authtoken,
      }
    });
};

export const updateSub = async (authtoken, slug, sub) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/sub/${slug}`, sub, {
      headers: {
        authtoken,
      },
    });
};

export const createSub = async (authtoken, sub) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/sub`, sub, {
      headers: {
        authtoken,
      },
    });
};