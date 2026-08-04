import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../services/authApi";

type Profile = {
  id: string;
  name: string;
  username: string;
  bio: string | null;
  profilePicture: string | null;
};

type Props = {
  profile: Profile;
};

const EditProfileForm = ({ profile }: Props) => {
  const navigate = useNavigate();

  const [updateProfile, { isLoading }] =
    useUpdateProfileMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setUsername(profile.username);
      setBio(profile.bio || "");
      setPreview(profile.profilePicture || "");
    }
  }, [profile]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("bio", bio);

    if (image) {
      formData.append("profilePicture", image);
    }

    try {
      await updateProfile(formData).unwrap();

      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col items-center gap-4">
        {preview ? (
          <img
            src={preview}
            alt="profile"
            className="h-28 w-28 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#E8DDD3] text-3xl font-semibold text-[#6D5D50]">
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          Change Photo
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-lg border p-3 outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Username
        </label>

        <input
          value={username}
          disabled
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full rounded-lg border p-3 outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Bio
        </label>

        <textarea
          rows={4}
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
          className="w-full rounded-lg border p-3 outline-none focus:border-black"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-black py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {isLoading
          ? "Saving..."
          : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfileForm;