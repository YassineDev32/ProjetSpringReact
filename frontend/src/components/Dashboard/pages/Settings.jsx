import React from "react";

const Settings = () => {
  return (
    <div className="mt-16 px-10 pb-14">
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Settings</h2>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-4">
          {["My Details", "Profile", "Password", "Email", "Notification"].map(
            (item, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-md font-medium ${
                  item === "Profile"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Profile Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Profile</h2>
          <p className="text-sm text-gray-500 mb-6">
            Update your photo and personal details here.
          </p>

          <form>
            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Live in
                </label>
                <input
                  type="text"
                  placeholder="Sylhet, Bangladesh"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Street
                </label>
                <input
                  type="text"
                  placeholder="SYL 3108"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="number"
                  placeholder="+880 17*******"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
            </div>

            {/* Date and Gender Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Gender
                </label>
                <input
                  type="text"
                  placeholder="Male"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-1">
                Your Photo
              </label>
              <p className="text-xs text-gray-500 mb-2">
                This will be displayed in your profile.
              </p>
              <input
                type="file"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 text-gray-700"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button className="text-sm text-red-500 hover:underline">
                Delete
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
