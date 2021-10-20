class CustomDate extends Date {
  formatForAPI() {
    return this.toISOString().replace(":00.000Z", "");
  }
}

export const getNextTimestamp = (timestamp, hours) => {
  const newTimestamp = timestamp + hours * 3600;
  return newTimestamp;
};

export const getDate = (timestamp) => {
  return new CustomDate(timestamp * 1000);
};

export default CustomDate;
