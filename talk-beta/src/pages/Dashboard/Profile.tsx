import NavBar from "@/components/navBar";

export default function Profile() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header Navigation */}
      <NavBar />

      <main className="w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        Profile Page
      </main>
    </div>
  );
}
