"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
  User,
  Lock,
  Trash2,
  AlertTriangle,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { useLanguage } from "@/contexts/language-context";
import { CustomDomainSection } from "@/components/dashboard/custom-domain-section";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const { t } = useLanguage();
  const d = t.dashboard.settings;

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: session?.user?.name || "",
    username: session?.user?.username || "",
    email: session?.user?.email || "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(session?.user?.image || null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Sync form when session data loads (important for OAuth users)
  useEffect(() => {
    if (session?.user) {
      setProfileForm({
        name: session.user.name || "",
        username: session.user.username || "",
        email: session.user.email || "",
      });
      setProfileImage(session.user.image || null);
    }
  }, [session?.user?.id]);

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [savingPassword, setSavingPassword] = useState(false);

  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);

  const saveProfile = async () => {
    if (!profileForm.name.trim() || !profileForm.username.trim()) {
      toast.error(d.profileTitle + " — " + d.fullName + " & " + d.username);
      return;
    }
    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(profileForm.username)) {
      toast.error(d.username + " " + d.usernameInvalid);
      return;
    }

    setSavingProfile(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profileForm, image: profileImage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await update({ name: profileForm.name, username: profileForm.username, image: profileImage });
      toast.success(d.profileUpdated);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : d.updateError);
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async () => {
    if (passwordForm.newPassword.length < 8) {
      toast.error(d.newPassword + " — 8+ characters required");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(d.passwordMismatch);
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success(d.passwordUpdated);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSavingPassword(false);
    }
  };

  const deleteAccount = async () => {
    const confirmWord = d.deleteWord;
    if (deleteConfirmText !== confirmWord) {
      toast.error(d.deleteConfirmPlaceholder);
      return;
    }

    setDeletingAccount(true);
    try {
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success(d.accountDeleted);
      await signOut({ callbackUrl: "/" });
    } catch {
      toast.error(d.deleteError);
      setDeletingAccount(false);
    }
  };

  const passwordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = passwordStrength(passwordForm.newPassword);
  const strengthLabels = ["", d.passwordWeak, d.passwordMedium, d.passwordGood, d.passwordStrong];
  const strengthColors = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{d.title}</h1>
        <p className="text-gray-500 mt-1">{d.subtitle}</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-[#8F00FF]" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{d.profileTitle}</h2>
              <p className="text-sm text-gray-500">{d.profileDesc}</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Avatar upload */}
            <div className="pb-4 border-b border-gray-100">
              <AvatarUpload
                currentImage={profileImage}
                name={profileForm.name || session?.user?.name}
                onImageChange={setProfileImage}
                loading={savingProfile}
              />
            </div>
            <Input
              label={d.fullName}
              placeholder="Jean Dupont"
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm((p) => ({ ...p, name: e.target.value }))
              }
            />
            <div>
              <Input
              label={d.username}
                placeholder="jeandupont"
                value={profileForm.username}
                onChange={(e) =>
                  setProfileForm((p) => ({
                    ...p,
                    username: e.target.value.toLowerCase().replace(/\s/g, ""),
                  }))
                }
                hint={`beassistlink.com/${profileForm.username || "username"}`}
              />
            </div>
            <Input
              label={d.email}
              type="email"
              placeholder="jean@exemple.com"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>

          <div className="flex justify-end mt-5">
            <Button
              onClick={saveProfile}
              loading={savingProfile}
              style={{ backgroundColor: "#8F00FF" }}
              className="text-white hover:opacity-90"
            >
              <Check className="w-4 h-4 mr-2" />
              {d.save}
            </Button>
          </div>
        </Card>

        {/* Password */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#8F00FF]" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{d.passwordTitle}</h2>
              <p className="text-sm text-gray-500">{d.passwordDesc}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                label={d.currentPassword}
                type={showPasswords.current ? "text" : "password"}
                placeholder="••••••••"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))
                }
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((p) => ({ ...p, current: !p.current }))
                }
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                label={d.newPassword}
                type={showPasswords.new ? "text" : "password"}
                placeholder="••••••••"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
                }
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((p) => ({ ...p, new: !p.new }))
                }
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              {/* Strength indicator */}
              {passwordForm.newPassword && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i <= strength ? strengthColors[strength] : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  {strength > 0 && (
                    <p className="text-xs text-gray-500">
                      {d.passwordStrengthLabel} <span className="font-medium">{strengthLabels[strength]}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                label={d.confirmPassword}
                type={showPasswords.confirm ? "text" : "password"}
                placeholder="••••••••"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                }
                error={
                  passwordForm.confirmPassword &&
                  passwordForm.confirmPassword !== passwordForm.newPassword
                    ? d.passwordMismatch
                    : undefined
                }
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))
                }
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <Button
              onClick={savePassword}
              loading={savingPassword}
              disabled={
                !passwordForm.currentPassword ||
                !passwordForm.newPassword ||
                passwordForm.newPassword !== passwordForm.confirmPassword
              }
              style={{ backgroundColor: "#8F00FF" }}
              className="text-white hover:opacity-90 disabled:opacity-50"
            >
              {d.updatePassword}
            </Button>
          </div>
        </Card>

        {/* Custom domain */}
        <CustomDomainSection />

        {/* Danger zone */}
        <Card className="p-6 border-red-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{d.dangerTitle}</h2>
              <p className="text-sm text-gray-500">{d.dangerDesc}</p>
            </div>
          </div>

          {!showDeleteConfirm ? (
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {d.deleteAccount}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {d.deleteWarning}
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                {d.deleteBtn}
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-red-50 rounded-xl border border-red-200 space-y-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    {d.deleteConfirmTitle}
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    {d.deleteConfirmDesc}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-red-700 mb-1.5">
                  {d.deleteTypeLabel.replace('"SUPPRIMER"', `"${d.deleteWord}"`).replace('"DELETE"', `"${d.deleteWord}"`)}
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={d.deleteWord}
                  className="w-full px-3 py-2 text-sm border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 bg-white"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText("");
                  }}
                >
                  {d.cancelBtn}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  loading={deletingAccount}
                  disabled={deleteConfirmText !== d.deleteWord}
                  onClick={deleteAccount}
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  {d.deleteFinalBtn}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
