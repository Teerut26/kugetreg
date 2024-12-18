import { type NotificationData } from "@mantine/notifications";

export const SuccessNotificationData: NotificationData = {
  title: "สำเร็จ",
  message: "สำเร็จ",
  color: "teal",
  loading: false,
  autoClose: true,
};

export const ErrorNotificationData: NotificationData = {
  title: "เกิดข้อผิดพลาด",
  message: "เกิดข้อผิดพลาด",
  color: "red",
  loading: false,
  autoClose: true,
};

export const LoadingNotificationData: NotificationData = {
  title: "กำลังโหลด",
  message: "กำลังโหลด...",
  color: "gray",
  loading: true,
  autoClose: false
};
