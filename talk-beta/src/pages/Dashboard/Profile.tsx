// export default function Profile() {
//   return (
//     <div className="min-h-screen overflow-hidden">
//       {/* Header Navigation */}
//       <NavBar />

//       <main className="w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
//         Profile Page
//       </main>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProfileImage from "@/assets/profile.png";
import NavBar from "@/components/navBar";

export default function Profile() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(false);
  const [learningGoal, setLearningGoal] = useState("improve-fluency");

  return (
    <div className="min-h-screen  bg-gray-50">
      <NavBar />
      {/* Main Content */}
      <main className="w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        {/* Profile Information Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal details and profile picture.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={ProfileImage}
                  alt="Profile photo"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
              <Button
                variant="outline"
                className="text-gray-700 bg-transparent"
              >
                Upload New Photo
              </Button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  defaultValue="Jane Doe"
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="jane.doe@example.com"
                  className="max-w-md"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Application Preferences Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Application Preferences
            </CardTitle>
            <CardDescription>
              Customize your learning experience and notification settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Notification Preferences */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="email-notifications"
                    className="text-base"
                  >
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="in-app-notifications"
                    className="text-base"
                  >
                    In-App Notifications
                  </Label>
                  <Switch
                    id="in-app-notifications"
                    checked={inAppNotifications}
                    onCheckedChange={setInAppNotifications}
                  />
                </div>
              </div>
            </div>

            {/* Learning Goal Focus */}
            <div>
              <h3 className="text-lg font-medium mb-4">Learning Goal Focus</h3>
              <RadioGroup
                value={learningGoal}
                onValueChange={setLearningGoal}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="improve-fluency"
                    id="improve-fluency"
                  />
                  <Label htmlFor="improve-fluency">Improve Fluency</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="refine-pronunciation"
                    id="refine-pronunciation"
                  />
                  <Label htmlFor="refine-pronunciation">
                    Refine Pronunciation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="master-rhetoric"
                    id="master-rhetoric"
                  />
                  <Label htmlFor="master-rhetoric">Master Rhetoric</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="optimize-pacing"
                    id="optimize-pacing"
                  />
                  <Label htmlFor="optimize-pacing">Optimize Pacing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="boost-confidence"
                    id="boost-confidence"
                  />
                  <Label htmlFor="boost-confidence">Boost Confidence</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="everyday-communication"
                    id="everyday-communication"
                  />
                  <Label htmlFor="everyday-communication">
                    Everyday Communication
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
