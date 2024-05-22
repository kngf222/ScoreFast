import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://scorefast.xyz
// - Name: ScoreFast
// - Description: The fastest and simplest way to score your tennis or pickleball match and share it live with friends.
// - User data collected: name, email, phone number and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: jibrandoesthings@gmail.com

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Effective Date: May 22, 2024

Welcome to ScoreFast! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.

1. Information We Collect
We collect the following personal information:

	•	Name
	•	Email
	•	Phone number
	•	Payment information

We also collect non-personal data through web cookies.

2. Purpose of Data Collection
We collect your data to process orders and provide our services effectively.

3. Data Sharing
We do not share your personal data with any other parties.

4. Children’s Privacy
We do not collect any data from children.

5. Updates to the Privacy Policy
We may update this Privacy Policy from time to time. Users will be notified of any changes via email.

6. Contact Information
If you have any questions about this Privacy Policy, please contact us at jibrandoesthings@gmail.com.

For all other inquiries, please visit our Contact Us page on the Website.

By using ScoreFast, you consent to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
