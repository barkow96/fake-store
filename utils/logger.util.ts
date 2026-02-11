const getTimestamp = () => new Date().toISOString();

const logsDisabled =
  process.env.NEXT_PUBLIC_FEATURE_FLAG_DISABLE_LOGS === "true";

export const logError = (message: string, details?: unknown): void => {
  if (logsDisabled) return;

  if (details) {
    console.error(`❌ ${getTimestamp()} ${message}`, {
      details,
      stringifiedDetails: JSON.stringify(details),
    });
  } else {
    console.error(`❌ ${getTimestamp()} ${message}`);
  }
};

export const logWarn = (message: string, details?: unknown): void => {
  if (logsDisabled) return;

  if (details) {
    console.warn(`⚠️ ${getTimestamp()} ${message}`, {
      details,
      stringifiedDetails: JSON.stringify(details),
    });
  } else {
    console.warn(`⚠️ ${getTimestamp()} ${message}`);
  }
};

export const logInfo = (message: string, details?: unknown): void => {
  if (logsDisabled) return;

  if (details) {
    console.info(`🔎 ${getTimestamp()} ${message}`, {
      details,
      stringifiedDetails: JSON.stringify(details),
    });
  } else {
    console.info(`🔎 ${getTimestamp()} ${message}`);
  }
};
