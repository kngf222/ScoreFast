import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste below
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://scorefast.xyz
// - Name: ScoreFast
// - Contact information: jibrandoesthings@gmail.com
// - Description: The fastest and simplest way to score your tennis or pickleball match and share it live with friends.
// - Ownership: when buying access to the score tracker, users will have access to it. They do not own the match tracker and do not have the right to clone the code and resell it.
// - User data collected: name, email, phone number and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://scorefast.xyz/privacy-policy
// - Governing Law: United States of America
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Effective Date: May 22, 2024

Welcome to ScoreFast! By accessing or using our website (https://scorefast.xyz), you agree to be bound by these Terms & Services.

1. Description of Service
ScoreFast provides the fastest and simplest way to score your tennis or pickleball match and share it live with friends.

2. Ownership and Access
When you purchase access to the ScoreFast score tracker, you are granted a license to use the service. You do not own the match tracker and do not have the right to clone the code or resell it.

3. User Data Collection
We collect the following personal information:

	•	Name
	•	Email
	•	Phone number
	•	Payment information

We also collect non-personal data through web cookies. For more information, please review our Privacy Policy at Privacy Policy.

4. Governing Law
These terms shall be governed and construed in accordance with the laws of the United States of America.

5. Updates to Terms
We may update these Terms & Services from time to time. Users will be notified of any changes via email.

6. Contact Information
If you have any questions about these Terms & Services, please contact us at jibrandoesthings@gmail.com.

Thank you for using ScoreFast!

ScoreFast Team`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
