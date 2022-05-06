export const ONDEMAND_DEAL_ID = {
  DELIVERY: -10000,
  PICKUP: -10001,
};

export const RTG_WAVES = {
  OD_DELIVERY: "8",
  OD_PICKUP: "9",
  SC_DINNER: "0",
  SC_LUNCH: "1",
  SC_BREAKFAST: "2",
};

export const DELIVERY_WAVES = [
  RTG_WAVES.SC_BREAKFAST,
  RTG_WAVES.SC_DINNER,
  RTG_WAVES.SC_LUNCH,
];

export const ONDEMAND_WAVES = [RTG_WAVES.OD_DELIVERY, RTG_WAVES.OD_PICKUP];

export const METHODS = {
  DELIVERY_ONDEMAND: "delivery_ondemand",
  PICKUP_ONDEMAND: "pickup_ondemand",
  SCHEDULED: "scheduled",
};

/** Ricepo Args */
export const RICEPO = {
  /** Temp CDN image URL */
  BANNER_IMG_URL:
    "https://cdn.sayweee.net/common/59e2c3aa76197e385afc8cf0fe0ef6b0_0x0.png",
  RICEPO_APP_URL: "https://ricepo.app.link/openc",
};
