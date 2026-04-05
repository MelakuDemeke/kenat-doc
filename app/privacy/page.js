export const metadata = {
  title: "Privacy Policy | Kenat",
  description:
    "How Kenat collects, uses, and shares your information when you use the Kenat application.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-100 dark:bg-zinc-900 text-zinc-900 dark:text-white selection:bg-purple-500/50 relative overflow-x-hidden min-h-[60vh]">
      <main className="relative z-10 container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500 pb-2">
          Privacy Policy for Kenat
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          <strong>Effective Date: March 26, 2026</strong>
        </p>

        <p className="mt-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          At <strong>Kenat</strong>, we value your privacy. This Privacy Policy
          describes how your information is collected, used, and shared when you
          use the Kenat application.
        </p>

        <hr className="my-10 border-zinc-300 dark:border-zinc-700" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 first:mt-0">
            1. Information We Collect
          </h2>

          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6">
            A. Personal Information
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            When you sign in using Google Authentication, we collect and store:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Email Address</strong>: To identify your account.
            </li>
            <li>
              <strong>Display Name</strong>: To personalize your experience.
            </li>
            <li>
              <strong>User ID (UID)</strong>: A unique identifier for your
              profile.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6">
            B. Account Data
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            If you choose to link your Telegram account, we store:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Telegram ID</strong>: Used for cross-platform integration.
            </li>
            <li>
              <strong>Link Token</strong>: A temporary token created to securely
              link your accounts.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6">
            C. Local Device Data
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>System Calendars</strong>: Kenat requests permission to
              read and write events to your device&apos;s system calendars
              (Google Calendar, iCal, etc.). This data is processed locally and is
              NOT uploaded to our servers unless part of your system&apos;s own
              synchronization (e.g., Google Calendar sync).
            </li>
            <li>
              <strong>App Preferences</strong>: Settings such as language,
              theme, accent color, and display modes are stored locally on your
              device.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6">
            D. Third-Party Services
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            We use third-party services that may collect information used to
            identify you:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Google AdMob</strong>: To display advertisements. AdMob
              may use device identifiers (like IDFA or GAID) for ad
              personalization.
            </li>
            <li>
              <strong>Firebase Cloud Messaging (FCM)</strong>: To send push
              notifications. We store a device token to route notifications to
              your device.
            </li>
            <li>
              <strong>Firebase Firestore</strong>: To store your user profile
              and account status (e.g., Pro status).
            </li>
          </ul>
        </section>

        <hr className="my-10 border-zinc-300 dark:border-zinc-700" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            2. How We Use Your Information
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              Provide and maintain the service (e.g., date conversion, holiday
              tracking).
            </li>
            <li>
              Synchronize your account preferences and Pro status across
              devices.
            </li>
            <li>Enable integration with Telegram.</li>
            <li>Deliver relevant advertisements.</li>
            <li>
              Send notifications for upcoming events and holidays.
            </li>
          </ul>
        </section>

        <hr className="my-10 border-zinc-300 dark:border-zinc-700" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            3. Data Storage and Security
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Firestore</strong>: Account information is stored
              securely in Google Firebase&apos;s cloud database.
            </li>
            <li>
              <strong>Local Storage</strong>: Personal calendar events and app
              settings are stored locally on your device.
            </li>
            <li>
              We implement industry-standard security measures to protect your
              information, but no method of transmission over the Internet is
              100% secure.
            </li>
          </ul>
        </section>

        <hr className="my-10 border-zinc-300 dark:border-zinc-700" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            4. Third-Party Access
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            We do not sell your personal information. We only share data with
            third parties (like Google AdMob or Firebase) as necessary to
            provide the services mentioned above.
          </p>
        </section>

        <hr className="my-10 border-zinc-300 dark:border-zinc-700" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            5. Your Choices
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Permissions</strong>: You can grant or revoke calendar and
              notification permissions at any time through your device
              settings.
            </li>
            <li>
              <strong>Account Deletion</strong>: You can permanently delete your
              account and all associated data at any time from the app&apos;s
              Settings under the &quot;Account&quot; section. This action is
              immediate and irreversible.
            </li>
            <li>
              <strong>Opt-out</strong>: You can opt-out of personalized ads via
              your device&apos;s privacy settings.
            </li>
          </ul>
        </section>

        <hr className="my-10 border-zinc-300 dark:border-zinc-700" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            6. Children&apos;s Privacy
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Kenat does not knowingly collect personal information from children
            under 13. If we discover that a child under 13 has provided us with
            personal information, we will delete it immediately.
          </p>
        </section>

        <hr className="my-10 border-zinc-300 dark:border-zinc-700" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            7. Changes to This Policy
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            We may update our Privacy Policy periodically. We will notify you
            of any changes by posting the new Privacy Policy on this page and
            updating the effective date.
          </p>
        </section>

        <hr className="my-10 border-zinc-300 dark:border-zinc-700" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            8. Contact Us
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us through the &quot;Contact Support&quot;
            option in the Kenat app settings.
          </p>
        </section>
      </main>
    </div>
  );
}
