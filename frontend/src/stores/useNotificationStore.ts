import { create } from "zustand";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "order" | "delivery" | "promo" | "system";
  createdAt: string;
  read: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  addNotification: (title: string, message: string, type?: NotificationItem["type"]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  getUnreadCount: () => number;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-welcome",
    title: "Welcome to Amber",
    message: "Your destination for curated atelier craftsmanship and verified electronics.",
    type: "system",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: "notif-order-demo",
    title: "Order #AMB-9481 Delivered",
    message: "Your Ceramic Studio Acoustics has been delivered to Victoria Island, Lagos.",
    type: "delivery",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    read: false,
  },
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: INITIAL_NOTIFICATIONS,

  addNotification: (title, message, type = "order") => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      message,
      type,
      createdAt: new Date().toISOString(),
      read: false,
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.read).length;
  },
}));

