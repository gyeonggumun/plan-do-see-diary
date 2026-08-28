export const SCHEMA_VERSION = 2;

export const migrateRecords = (records) => {
  let isMigrated = false;
  const migratedData = records.map(record => {
    if (!record.schemaVersion || record.schemaVersion === 1) {
      isMigrated = true;
      return {
        ...record,
        tag: "기본값",
        schemaVersion: SCHEMA_VERSION
      };
    }
    return record;
  });
  return { migratedData, isMigrated };
};

export const calculateWeeklySummary = (records) => {
  let validTotal = 0;
  let invalidCount = 0;

  records.forEach(record => {
    const value = Number(record.value);
    const date = new Date(record.date);
    
    if (isNaN(value) || isNaN(date.getTime())) {
      invalidCount++;
      return;
    }
    validTotal += value;
  });

  return { validTotal, invalidCount };
};