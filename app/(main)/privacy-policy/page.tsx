import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata(
  "Privacy Policy",
  "Cryptic Daily Privacy Policy - Learn how we collect, use, and protect your data.",
  "/privacy-policy"
);

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold font-heading text-[#F9FAFB] mb-3">Privacy Policy</h1>
      <p className="text-[#9CA3AF] text-sm mb-10">Last updated: March 4, 2026</p>

      <div className="space-y-10 text-[#D1D5DB] leading-relaxed">
        {[
          {
            title: "1. Information We Collect",
            content: "We collect information you provide directly, such as when you create an account, subscribe to our newsletter, or post a comment. This may include your name, email address, and profile information. We also automatically collect certain information when you visit our site, including your IP address, browser type, referring URLs, pages viewed, and the date and time of your visit."
          },
          {
            title: "2. How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services; send you newsletters and updates you've subscribed to; respond to your comments and questions; analyze usage patterns to improve user experience; and comply with legal obligations."
          },
          {
            title: "3. Cookies and Tracking Technologies",
            content: "We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data sent to your browser. We use Google Analytics (GA4) to analyze site traffic and Google AdSense to display advertisements. These services may use cookies to personalize ads based on your browsing history."
          },
          {
            title: "4. Third-Party Advertising (Google AdSense)",
            content: "We use Google AdSense to serve advertisements on our site. Google may use cookies and web beacons to collect data for personalized advertising. You can opt out of Google's use of cookies by visiting Google's Ads Settings. We are not responsible for the privacy practices of third-party advertisers."
          },
          {
            title: "5. Data Sharing",
            content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services (e.g., authentication via Clerk, database services via Supabase) or as required by law."
          },
          {
            title: "6. Your GDPR Rights",
            content: "If you are a resident of the European Economic Area (EEA), you have the right to access personal data we hold about you, request correction or deletion of your data, object to processing, and the right to data portability. To exercise these rights, please contact us at privacy@crypticdaily.com."
          },
          {
            title: "7. Data Retention",
            content: "We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us."
          },
          {
            title: "8. Security",
            content: "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security."
          },
          {
            title: "9. Changes to This Policy",
            content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date above."
          },
          {
            title: "10. Contact Us",
            content: "If you have any questions about this Privacy Policy, please contact us at privacy@crypticdaily.com or through our Contact page."
          }
        ].map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-bold font-heading text-[#F9FAFB] mb-3">{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
