const getSortedArrayByCategory = (array, attribute = null) => {
  return array.sort((a, b) => {
    const aElement = attribute ? a[attribute].category[0] : a.category[0];
    const bElement = attribute ? b[attribute].category[0] : b.category[0];

    if (aElement < bElement) {
      return -1;
    }

    if (aElement > bElement) {
      return 1;
    }
    return 0;
  });
};

const getFromArrayOrString = (payload) => {
  return Array.isArray(payload) && payload.length ? payload[0] : payload;
};

const getImage = (payload) => {
  const icon = getFromArrayOrString(payload);
  return icon && typeof icon === "string"
    ? `/chess-icons/${icon.toLowerCase().trim()}.png`
    : "/chess-icons/none.png";
};

const makeId = (length = 50) =>
  [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join("");

export { getSortedArrayByCategory, getImage, getFromArrayOrString, makeId };
