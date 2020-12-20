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

export { getSortedArrayByCategory };
