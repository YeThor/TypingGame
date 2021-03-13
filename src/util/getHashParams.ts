function getHashParams(hash: string): { [key: string]: string } {
  const params = hash.split("?")[1];

  return params
    ? params
        .split("&")
        .reduce((acc: { [key: string]: string }, param: string) => {
          const [key, value] = param.split("=");

          acc[key] = value;
          return acc;
        }, {})
    : {};
}

export default getHashParams;
