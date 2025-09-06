// src/components/NotificationCenter.tsx
import { useState } from "react";
import { Bell, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type NotificationType = "Weather" | "Yield" | "Pest" | "SMS" | "System";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  tags: string[];
  timestamp: string;
  read: boolean;
  archived: boolean;
}

const mockData: Notification[] = [
  {
    id: "1",
    type: "Weather",
    title: "Heavy rainfall expected in Ward 3",
    description: "Flood risk for AEZ-3B within 48 hours.",
    tags: ["Flood", "Ward 3"],
    timestamp: "2025-09-02T09:00:00Z",
    read: false,
    archived: false,
  },
  {
    id: "2",
    type: "Yield",
    title: "Maize yield drop detected",
    description: "10% decrease forecasted due to heat stress.",
    tags: ["Maize", "Yield"],
    timestamp: "2025-09-01T15:30:00Z",
    read: true,
    archived: false,
  },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockData);
  const [filters, setFilters] = useState<NotificationType[]>([]);
  const [search, setSearch] = useState("");

  const toggleFilter = (type: NotificationType) => {
    setFilters((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const archive = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: true } : n))
    );
  };

  const filtered = notifications.filter(
    (n) =>
      !n.archived &&
      (filters.length === 0 || filters.includes(n.type)) &&
      (n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* Filters */}
      <Card className="col-span-1 p-4 space-y-2">
        <h2 className="font-semibold">Filters</h2>
        {["Weather", "Yield", "Pest", "SMS", "System"].map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <Checkbox
              checked={filters.includes(type as NotificationType)}
              onCheckedChange={() => toggleFilter(type as NotificationType)}
            />
            <span>{type}</span>
          </label>
        ))}
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4"
        />
      </Card>

      {/* Notification Feed */}
      <div className="col-span-3 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell className="w-5 h-5" /> Notifications
          </h2>
          <Button variant="outline" size="sm">
            <Archive className="w-4 h-4 mr-1" /> View Archive
          </Button>
        </div>

        {filtered.map((n) => (
          <Card
            key={n.id}
            className={cn(
              "p-4 cursor-pointer hover:bg-gray-50",
              !n.read && "border-l-4 border-blue-500"
            )}
            onClick={() => markAsRead(n.id)}
          >
            <CardContent className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{n.title}</h3>
                <p className="text-sm text-gray-600">{n.description}</p>
                <div className="text-xs text-gray-500">
                  {new Date(n.timestamp).toLocaleString()}
                </div>
                <div className="mt-1 space-x-1">
                  {n.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-gray-100 rounded text-xs"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  archive(n.id);
                }}
              >
                Archive
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
