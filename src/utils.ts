// Method to parse out of nested JSON using . notation
export const parseJson = (attr, data) => {
    if (attr.includes('.')) {
        const attrs = attr.split(".");
        return attrs.reduce((val, attr) => {
          return val[[attr]];
        }, data);
    } else {
        return data[[attr]]
    }
  };