import { isEmptyObject } from "utils/tools/isEmptyObject";

export const checkRtgIsValid = (orderDatesData: any) => {
  if (!orderDatesData || isEmptyObject(orderDatesData)) return false;
  const can_order_days = orderDatesData?.can_order_days || [];
  const od_delivery = orderDatesData?.od_delivery || false;
  const od_pickup = orderDatesData?.od_pickup || false;
  const scheduledIsValid = can_order_days.length > 0;
  return scheduledIsValid || od_delivery || od_pickup;
};
