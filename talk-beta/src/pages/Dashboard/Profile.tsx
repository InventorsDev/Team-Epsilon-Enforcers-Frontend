import { useEffect, useRef, useState } from "react";
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
import { supabase } from "../../supabaseClient"; // Adjust path if needed

export default function Profile() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(false);
  const [learningGoal, setLearningGoal] = useState("improve-fluency");
  const [userEmail, setUserEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const [username, setUsername] = useState<string>("Jane Doe");
  const [profileImage, setProfileImage] = useState<string>(ProfileImage);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // UI state for saving
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // For file input trigger
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data, error } = await supabase.auth.getUser();

      const handlers: Record<string, () => void> = {
        error: () => {
          setEmailError("Failed to fetch email. Please try again.");
          setUserEmail("");
        },
        noUser: () => {
          setEmailError("No user email found.");
          setUserEmail("");
        },
        success: () => {
          setUserEmail(data.user?.email ?? "");
          setEmailError(null);
        },
      };

      switch (true) {
        case Boolean(error):
          handlers.error();
          break;
        case !data?.user?.email:
          handlers.noUser();
          break;
        default:
          handlers.success();
      }
    };
    fetchUserEmail();
  }, []);

  // Handle image file selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setProfileImage(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Supabase Storage and get public URL
  const uploadProfileImage = async (file: File): Promise<string | null> => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) return null;

    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${userId}.${fileExt}`;

    // Upload to 'avatars' bucket
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) return null;

    // Get public URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    return data?.publicUrl ?? null;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    let imageUrl = profileImage;
    if (selectedImageFile) {
      const uploadedUrl = await uploadProfileImage(selectedImageFile);
      if (!uploadedUrl) {
        setSaveError("Failed to upload profile image.");
        setIsSaving(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) {
      setSaveError("Authentication error. Please log in again.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch(
        "https://team-epsilon-enforcers-backend.onrender.com/users/me",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
            profileImage: imageUrl,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }
      setSaveSuccess("Profile updated successfully!");
    } catch (err: any) {
      setSaveError(err.message || "An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen  bg-gray-50 overflow-hidden">
      <NavBar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
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
                  src={profileImage}
                  alt="Profile photo"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
              <Button
                variant="outline"
                className="text-gray-700 bg-transparent"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSaving}
              >
                Upload New Photo
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
                disabled={isSaving}
              />
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="max-w-md"
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userEmail}
                    readOnly
                    className="max-w-md bg-gray-100 cursor-not-allowed border border-gray-300 rounded px-3 py-2"
                  />
                  {emailError && (
                    <p className="text-sm text-red-500">{emailError}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 flex items-center"
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving && (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  )}
                  Save Changes
                </Button>
              </div>
              {saveSuccess && (
                <p className="text-green-600 text-sm mt-2">{saveSuccess}</p>
              )}
              {saveError && (
                <p className="text-red-600 text-sm mt-2">{saveError}</p>
              )}
            </form>
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
        <Card className="mb-8 invisible">
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              This is an example transcript of your speech. As you speak, the AI
              analyzes your delivery and provides real-time feedback. You can
              see how certain words or phrases are highlighted to indicate areas
              for improvement, such as filler words or pacing issues.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
